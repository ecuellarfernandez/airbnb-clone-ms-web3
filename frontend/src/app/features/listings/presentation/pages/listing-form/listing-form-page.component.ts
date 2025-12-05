import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadCloudinaryUseCase } from '@app/shared/cloudinary/application/use-cases/upload-cloudinary.usecase';
import { DeleteCloudinaryUseCase } from '@app/shared/cloudinary/application/use-cases/delete-cloudinary.usecase';
import { CloudinaryImage } from '@app/shared/cloudinary/domain/models/cloudinary-image.model';
import { AuthService } from '@features/auth/domain/services/auth.service';
import { ListingFormStateService, ListingFormState } from '@features/listings/application/services/listing-form-state.service';
import { take } from 'rxjs';
import { CreateListingUseCase } from '@app/features/listings/application/use-cases/create-listing.use-case';
import {
  LISTING_AMENITIES,
  CategoryOption,
  AmenityOption,
  getAmenityCategories,
  getPropertyTypeCategories,
  getSpaceTypeCategories
} from '@features/listings/domain/constants/listing-options.constants';

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

  // Opciones disponibles
  propertyTypes: CategoryOption[] = getPropertyTypeCategories();
  spaceTypes: CategoryOption[] = getSpaceTypeCategories();
  amenities: AmenityOption[] = LISTING_AMENITIES;
  amenityCategories: string[] = getAmenityCategories();

  steps: Step[] = [
    { id: 0, title: 'Información Básica', description: 'Título y descripción de tu propiedad' },
    { id: 1, title: 'Categoría', description: 'Tipo de alojamiento' },
    { id: 2, title: 'Ubicación', description: 'Dónde se encuentra tu propiedad' },
    { id: 3, title: 'Detalles', description: 'Capacidad y características' },
    { id: 4, title: 'Amenidades', description: 'Servicios y comodidades' },
    { id: 5, title: 'Precio', description: 'Establece tu tarifa por noche' },
    { id: 6, title: 'Fotos', description: 'Muestra tu propiedad' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private uploadCloudinaryUseCase: UploadCloudinaryUseCase,
    private deleteCloudinaryUseCase: DeleteCloudinaryUseCase,
    private createListingUseCase: CreateListingUseCase,
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
        latitude: [null, [Validators.min(-90), Validators.max(90)]],
        longitude: [null, [Validators.min(-180), Validators.max(180)]]
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
    if (!this.isCategorySelected(id)) {
      this.categoryIdsArray.push(this.fb.control(id));
    }
  }

  removeCategoryId(id: string): void {
    const index = this.categoryIdsArray.controls.findIndex(ctrl => ctrl.value === id);
    if (index > -1) {
      this.categoryIdsArray.removeAt(index);
    }
  }

  toggleCategory(id: string, categoryType: 'Property Type' | 'Space Type'): void {
    if (this.isCategorySelected(id)) {
      this.removeCategoryId(id);
    } else {
      // Si es Space Type, remover cualquier otra Space Type seleccionada
      if (categoryType === 'Space Type') {
        this.clearSpaceTypeCategories();
      }
      this.addCategoryId(id);
    }
  }

  clearSpaceTypeCategories(): void {
    const spaceTypeIds = this.spaceTypes.map(st => st.id);
    const indicesToRemove: number[] = [];

    this.categoryIdsArray.controls.forEach((ctrl, index) => {
      if (spaceTypeIds.includes(ctrl.value)) {
        indicesToRemove.push(index);
      }
    });

    // Remover en orden inverso para no afectar los índices
    indicesToRemove.reverse().forEach(index => {
      this.categoryIdsArray.removeAt(index);
    });
  }

  isCategorySelected(id: string): boolean {
    return this.categoryIdsArray.controls.some(ctrl => ctrl.value === id);
  }

  addAmenityId(id: string): void {
    if (!this.isAmenitySelected(id)) {
      this.amenityIdsArray.push(this.fb.control(id));
    }
  }

  removeAmenityId(id: string): void {
    const index = this.amenityIdsArray.controls.findIndex(ctrl => ctrl.value === id);
    if (index > -1) {
      this.amenityIdsArray.removeAt(index);
    }
  }

  toggleAmenity(id: string): void {
    if (this.isAmenitySelected(id)) {
      this.removeAmenityId(id);
    } else {
      this.addAmenityId(id);
    }
  }

  isAmenitySelected(id: string): boolean {
    return this.amenityIdsArray.controls.some(ctrl => ctrl.value === id);
  }

  getAmenitiesByCategory(category: string): AmenityOption[] {
    return this.amenities.filter(amenity => amenity.category === category);
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

    if (imageToRemove.publicId) {
      this.deleteCloudinaryUseCase.execute(imageToRemove.publicId).subscribe({
        next: () => {
          console.log('Image deleted successfully:', imageToRemove.publicId);
          // Remove from form and UI after successful deletion
          this.imagesArray.removeAt(index);
          this.uploadedImages.splice(index, 1);

          if (this.uploadedImages.length > 0 && !this.uploadedImages.some(img => img.isPrimary)) {
            this.setPrimaryImage(0);
          }
        },
        error: (error) => {
          console.error('Failed to delete image:', error);
          this.imagesArray.removeAt(index);
          this.uploadedImages.splice(index, 1);

          if (this.uploadedImages.length > 0 && !this.uploadedImages.some(img => img.isPrimary)) {
            this.setPrimaryImage(0);
          }
        }
      });
    } else {
      console.warn('Image has no publicId, removing from UI only');
      this.imagesArray.removeAt(index);
      this.uploadedImages.splice(index, 1);

      if (this.uploadedImages.length > 0 && !this.uploadedImages.some(img => img.isPrimary)) {
        this.setPrimaryImage(0);
      }
    }
  }

  setPrimaryImage(index: number): void {
    this.uploadedImages.forEach((img, i) => {
      img.isPrimary = i === index;
      const group = this.imagesArray.at(i) as FormGroup;
      group.patchValue({ isPrimary: i === index });
    });
  }

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
      case 1: // Categoría
        return this.categoryIdsArray.length > 0;
      case 2: // Ubicación
        return this.form.get('location')?.valid;
      case 3: // Detalles
        return this.form.get('capacity')?.valid &&
          this.form.get('bedrooms')?.valid &&
          this.form.get('bathrooms')?.valid;
      case 4: // Amenidades
        return this.amenityIdsArray.length > 0;
      case 5: // Precio
        return this.form.get('price')?.valid;
      case 6: // Fotos
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
        this.form.get('categoryIds')?.markAsTouched();
        break;
      case 2:
        Object.keys((this.form.get('location') as FormGroup).controls).forEach(key => {
          this.form.get('location')?.get(key)?.markAsTouched();
        });
        break;
      case 3:
        this.form.get('capacity')?.markAsTouched();
        this.form.get('bedrooms')?.markAsTouched();
        this.form.get('bathrooms')?.markAsTouched();
        break;
      case 4:
        this.form.get('amenityIds')?.markAsTouched();
        break;
      case 5:
        Object.keys((this.form.get('price') as FormGroup).controls).forEach(key => {
          this.form.get('price')?.get(key)?.markAsTouched();
        });
        break;
      case 6:
        this.form.get('images')?.markAsTouched();
        break;
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const payload = this.normalizePayload(this.form.value);
      console.log('Form Payload:', payload);

      this.createListingUseCase.execute(payload).subscribe({
        next: () => {
          console.log('✅ Listing created successfully!');
          this.formStateService.clearState();
          // Redirigir a home después de crear exitosamente
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('❌ Failed to create listing:', error);
        }
      });

    } else {
      this.form.markAllAsTouched();
    }
  }

  private normalizePayload(payload: any): any {
    const normalized = { ...payload };

    if (normalized.location) {
      if (normalized.location.latitude !== null && normalized.location.latitude !== undefined) {
        normalized.location.latitude = this.normalizeCoordinate(normalized.location.latitude);
      }
      if (normalized.location.longitude !== null && normalized.location.longitude !== undefined) {
        normalized.location.longitude = this.normalizeCoordinate(normalized.location.longitude);
      }
    }

    return normalized;
  }

  private normalizeCoordinate(value: any): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    // Convertir a string y reemplazar comas por puntos
    const normalized = String(value).replace(',', '.');
    const parsed = parseFloat(normalized);

    // Validar que sea un número válido
    return isNaN(parsed) ? null : parsed;
  }

  normalizeCoordinateInput(field: 'latitude' | 'longitude'): void {
    const control = this.form.get(`location.${field}`);
    if (control && control.value !== null && control.value !== undefined && control.value !== '') {
      const normalized = this.normalizeCoordinate(control.value);
      if (normalized !== null) {
        control.setValue(normalized, { emitEvent: false });
      }
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

  private saveCurrentState(): void {
    const state: ListingFormState = {
      formData: this.form.value,
      uploadedImages: this.uploadedImages,
      currentStep: this.currentStep,
      lastSaved: new Date()
    };
    this.formStateService.saveState(state);
  }

  private loadSavedState(): void {
    const savedState = this.formStateService.loadState();
    if (savedState) {
      if (savedState.formData) {
        this.form.patchValue(savedState.formData);
      }

      if (savedState.uploadedImages && savedState.uploadedImages.length > 0) {
        this.uploadedImages = savedState.uploadedImages;

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

      if (savedState.currentStep !== undefined) {
        this.currentStep = savedState.currentStep;
      }

      console.log('Loaded saved form state from:', savedState.lastSaved);
    }
  }
}
