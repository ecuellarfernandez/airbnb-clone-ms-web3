import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UploadCloudinaryUseCase } from '@app/shared/cloudinary/application/use-cases/upload-cloudinary.usecase';
import { DeleteCloudinaryUseCase } from '@app/shared/cloudinary/application/use-cases/delete-cloudinary.usecase';
import { CloudinaryImage } from '@app/shared/cloudinary/domain/models/cloudinary-image.model';
import { AuthService } from '@features/auth/domain/services/auth.service';
import { ListingFormStateService, ListingFormState } from '@features/listings/application/services/listing-form-state.service';
import { take } from 'rxjs';

interface Step {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-listing-form-page',
  standalone: false,
  templateUrl: './listing-form-page.component.html',
  styleUrls: ['./listing-form-page.component.scss']
})
export class ListingFormPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  uploading = false;
  uploadedImages: CloudinaryImage[] = [];
  currentStep = 0;

  steps: Step[] = [
    { id: 0, title: 'Información Básica', description: 'Título y descripción de tu propiedad' },
    { id: 1, title: 'Ubicación', description: 'Dónde se encuentra tu propiedad' },
    { id: 2, title: 'Detalles', description: 'Capacidad y características' },
    { id: 3, title: 'Precio', description: 'Establece tu tarifa por noche' },
    { id: 4, title: 'Fotos', description: 'Muestra tu propiedad' }
  ];

  constructor(
    private fb: FormBuilder,
    private uploadCloudinaryUseCase: UploadCloudinaryUseCase,
    private deleteCloudinaryUseCase: DeleteCloudinaryUseCase,
    private authService: AuthService,
    private formStateService: ListingFormStateService
  ) {
    this.form = this.fb.group({
      hostId: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      location: this.fb.group({
        city: ['', Validators.required],
        country: ['', Validators.required],
        address: ['', Validators.required],
        latitude: [0, Validators.required],
        longitude: [0, Validators.required]
      }),
      price: this.fb.group({
        amount: [0, [Validators.required, Validators.min(0)]],
        currency: ['USD', Validators.required]
      }),
      capacity: [1, [Validators.required, Validators.min(1)]],
      bedrooms: [1, [Validators.required, Validators.min(0)]],
      bathrooms: [1, [Validators.required, Validators.min(0)]],
      categoryIds: this.fb.array([]),
      amenityIds: this.fb.array([]),
      images: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.setHostId();
    this.addCategoryId('dd45c078-833a-4cf2-9b28-f4d9a584cd53');
    this.addAmenityId('066c1098-2cbc-497c-a5ec-e9a62823d5e0');
    this.loadSavedState();
  }

  ngOnDestroy(): void {
    this.saveCurrentState();
  }

  private setHostId(): void {
    this.authService.getCurrentUser().pipe(take(1)).subscribe({
      next: (result) => {
        if (result.success && result.data) {
          this.form.patchValue({ hostId: result.data.id });
        }
      },
      error: (err) => console.error('Error fetching user', err)
    });
  }

  get imagesArray(): FormArray {
    return this.form.get('images') as FormArray;
  }

  get categoryIdsArray(): FormArray {
    return this.form.get('categoryIds') as FormArray;
  }

  get amenityIdsArray(): FormArray {
    return this.form.get('amenityIds') as FormArray;
  }

  addCategoryId(id: string): void {
    this.categoryIdsArray.push(this.fb.control(id));
  }

  addAmenityId(id: string): void {
    this.amenityIdsArray.push(this.fb.control(id));
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploading = true;

      this.uploadCloudinaryUseCase.execute(file).subscribe({
        next: (image: CloudinaryImage) => {
          this.addImageToForm(image);
          this.uploading = false;
        },
        error: (error) => {
          console.error('Upload failed', error);
          this.uploading = false;
        }
      });
    }
  }

  private addImageToForm(image: CloudinaryImage): void {
    const isFirst = this.imagesArray.length === 0;
    const imageGroup = this.fb.group({
      url: [image.url, Validators.required],
      publicId: [image.publicId],
      isPrimary: [isFirst]
    });

    this.imagesArray.push(imageGroup);
    this.uploadedImages.push({
      ...image,
      isPrimary: isFirst
    });
  }

  removeImage(index: number): void {
    const imageToRemove = this.uploadedImages[index];

    // Delete from Cloudinary if it's a temporary image
    if (imageToRemove.isTemporary && imageToRemove.publicId) {
      this.deleteCloudinaryUseCase.execute(imageToRemove.publicId).subscribe({
        next: () => {
          console.log('Image deleted from Cloudinary:', imageToRemove.publicId);
        },
        error: (error) => {
          console.error('Failed to delete image from Cloudinary:', error);
          // Continue with removal from UI even if Cloudinary deletion fails
        }
      });
    }

    // TODO: If image belongs to existing listing (has listingId), call backend to delete from database
    // if (imageToRemove.listingId) {
    //   this.listingService.deleteImage(imageToRemove.listingId, imageToRemove.publicId).subscribe();
    // }

    // Remove from form and UI
    this.imagesArray.removeAt(index);
    this.uploadedImages.splice(index, 1);

    if (this.uploadedImages.length > 0 && !this.uploadedImages.some(img => img.isPrimary)) {
      this.setPrimaryImage(0);
    }
  }

  setPrimaryImage(index: number): void {
    this.uploadedImages.forEach((img, i) => {
      img.isPrimary = i === index;
      const group = this.imagesArray.at(i) as FormGroup;
      group.patchValue({ isPrimary: i === index });
    });
  }

  // Step Navigation
  nextStep(): void {
    if (this.isCurrentStepValid()) {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
      }
    } else {
      this.markCurrentStepAsTouched();
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  goToStep(stepIndex: number): void {
    if (stepIndex >= 0 && stepIndex < this.steps.length) {
      this.currentStep = stepIndex;
    }
  }

  isCurrentStepValid(): boolean | undefined {
    switch (this.currentStep) {
      case 0: // Información Básica
        return this.form.get('title')?.valid && this.form.get('description')?.valid;
      case 1: // Ubicación
        return this.form.get('location')?.valid;
      case 2: // Detalles
        return this.form.get('capacity')?.valid &&
          this.form.get('bedrooms')?.valid &&
          this.form.get('bathrooms')?.valid;
      case 3: // Precio
        return this.form.get('price')?.valid;
      case 4: // Fotos
        return this.imagesArray.length > 0;
      default:
        return false;
    }
  }

  private markCurrentStepAsTouched(): void {
    switch (this.currentStep) {
      case 0:
        this.form.get('title')?.markAsTouched();
        this.form.get('description')?.markAsTouched();
        break;
      case 1:
        Object.keys((this.form.get('location') as FormGroup).controls).forEach(key => {
          this.form.get('location')?.get(key)?.markAsTouched();
        });
        break;
      case 2:
        this.form.get('capacity')?.markAsTouched();
        this.form.get('bedrooms')?.markAsTouched();
        this.form.get('bathrooms')?.markAsTouched();
        break;
      case 3:
        Object.keys((this.form.get('price') as FormGroup).controls).forEach(key => {
          this.form.get('price')?.get(key)?.markAsTouched();
        });
        break;
      case 4:
        this.form.get('images')?.markAsTouched();
        break;
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const payload = this.form.value;
      console.log('Form Payload:', payload);

      // TODO: Submit to backend
      // After successful submission, clear the saved state
      this.formStateService.clearState();
    } else {
      this.form.markAllAsTouched();
    }
  }

  get isFirstStep(): boolean {
    return this.currentStep === 0;
  }

  get isLastStep(): boolean {
    return this.currentStep === this.steps.length - 1;
  }

  get progressPercentage(): number {
    return ((this.currentStep + 1) / this.steps.length) * 100;
  }

  /**
   * Save the current form state to sessionStorage
   */
  private saveCurrentState(): void {
    const state: ListingFormState = {
      formData: this.form.value,
      uploadedImages: this.uploadedImages,
      currentStep: this.currentStep,
      lastSaved: new Date()
    };
    this.formStateService.saveState(state);
  }

  /**
   * Load saved state from sessionStorage if available
   */
  private loadSavedState(): void {
    const savedState = this.formStateService.loadState();
    if (savedState) {
      // Restore form data
      if (savedState.formData) {
        this.form.patchValue(savedState.formData);
      }

      // Restore uploaded images
      if (savedState.uploadedImages && savedState.uploadedImages.length > 0) {
        this.uploadedImages = savedState.uploadedImages;

        // Rebuild images FormArray
        this.imagesArray.clear();
        savedState.uploadedImages.forEach(image => {
          const imageGroup = this.fb.group({
            url: [image.url, Validators.required],
            publicId: [image.publicId],
            isPrimary: [image.isPrimary || false]
          });
          this.imagesArray.push(imageGroup);
        });
      }

      // Restore current step
      if (savedState.currentStep !== undefined) {
        this.currentStep = savedState.currentStep;
      }

      console.log('Loaded saved form state from:', savedState.lastSaved);
    }
  }
}