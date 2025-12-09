import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadCloudinaryUseCase } from '@app/shared/cloudinary/application/use-cases/upload-cloudinary.usecase';
import { DeleteCloudinaryUseCase } from '@app/shared/cloudinary/application/use-cases/delete-cloudinary.usecase';
import { CloudinaryImage } from '@app/shared/cloudinary/domain/models/cloudinary-image.model';
import { AuthService } from '@features/auth/domain/services/auth.service';
import { ListingFormStateService, ListingFormState } from '@features/listings/application/services/listing-form-state.service';
import { take } from 'rxjs';
import { CreateListingUseCase, CreateListingCommand } from '@app/features/listings/application/use-cases/create-listing.use-case';
import { UpdateListingUseCase, UpdateListingCommand } from '@app/features/listings/application/use-cases/update-listing.use-case';
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
  isSubmitting = false;
  showValidationErrors = false;
  isEditMode = false;
  listingId?: string;
  private currentHostId?: string; // Para rastrear el usuario actual y validar estado guardado

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
    private updateListingUseCase: UpdateListingUseCase,
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
    // Verificar modo edición ANTES de todo
    this.checkForEditMode();

    // Si estamos en modo edición, limpiar cualquier estado de creación guardado
    if (this.isEditMode) {
      console.log('🔄 Edit mode - clearing any saved creation state');
      this.formStateService.clearState();
    }

    // Configurar hostId (esto también valida el estado guardado)
    this.setHostId();
  }

  ngOnDestroy(): void {
    // Solo guardar estado si NO estamos en modo edición y hay datos parciales
    if (!this.isEditMode && !this.isSubmitting) {
      // Solo guardar si hay datos significativos en el formulario
      const hasData = this.form.get('title')?.value ||
        this.uploadedImages.length > 0 ||
        this.categoryIdsArray.length > 0;
      if (hasData) {
        this.saveCurrentState();
      }
    }
  }

  private checkForEditMode(): void {
    console.log('🔍 Checking for edit mode...');

    // Primero verificar si hay estado en la navegación
    const navigation = this.router.getCurrentNavigation();
    console.log('📍 Navigation state:', navigation?.extras?.state);

    if (navigation?.extras?.state) {
      const state = navigation.extras.state;
      if (state['listing'] && state['editMode']) {
        console.log('✅ Edit mode detected via navigation!');
        console.log('📋 Listing data to populate:', state['listing']);

        this.isEditMode = true;
        this.listingId = state['listing'].id;
        this.populateFormForEdit(state['listing']);
        return;
      }
    }

    // También verificar en el localStorage como fallback
    try {
      const editData = localStorage.getItem('listing-edit-data');
      if (editData) {
        console.log('🔄 Found edit data in localStorage');
        const parsedData = JSON.parse(editData);
        if (parsedData.listing && parsedData.editMode) {
          console.log('✅ Edit mode detected via localStorage!');
          this.isEditMode = true;
          this.listingId = parsedData.listing.id;
          this.populateFormForEdit(parsedData.listing);
          // Limpiar el localStorage después de usar
          localStorage.removeItem('listing-edit-data');
          return;
        }
      }
    } catch (error) {
      console.error('Error reading edit data from localStorage:', error);
    }

    console.log('ℹ️ No edit mode detected - normal creation flow');
  }

  private populateFormForEdit(listing: any): void {
    console.log('🔄 Populating form for edit mode...');
    console.log('📋 Raw listing data received:', listing);

    // Limpiar estado previo completamente
    this.clearFormState();

    // Validar y normalizar datos antes de poblar
    const normalizedListing = this.normalizeListingData(listing);
    console.log('✨ Normalized listing data:', normalizedListing);

    // Log específico de cada sección
    console.log('📝 Form population details:');
    console.log('- ID:', normalizedListing.id);
    console.log('- Title:', normalizedListing.title);
    console.log('- Description length:', normalizedListing.description?.length || 0);
    console.log('- Location:', normalizedListing.location);
    console.log('- Price:', normalizedListing.price);
    console.log('- Capacity/Bedrooms/Bathrooms:', {
      capacity: normalizedListing.capacity,
      bedrooms: normalizedListing.bedrooms,
      bathrooms: normalizedListing.bathrooms
    });

    // Poblar campos básicos
    this.form.patchValue({
      title: normalizedListing.title || '',
      description: normalizedListing.description || '',
      location: {
        city: normalizedListing.location?.city || '',
        country: normalizedListing.location?.country || '',
        address: normalizedListing.location?.address || '',
        latitude: normalizedListing.location?.latitude || null,
        longitude: normalizedListing.location?.longitude || null
      },
      price: {
        amount: normalizedListing.price?.amount || 0,
        currency: normalizedListing.price?.currency || 'USD'
      },
      capacity: normalizedListing.capacity || 1,
      bedrooms: normalizedListing.bedrooms || 1,
      bathrooms: normalizedListing.bathrooms || 1
    });

    // Poblar categorías
    this.categoryIdsArray.clear();
    if (normalizedListing.categoryIds && Array.isArray(normalizedListing.categoryIds)) {
      console.log(`📂 Adding ${normalizedListing.categoryIds.length} categories:`, normalizedListing.categoryIds);
      normalizedListing.categoryIds.forEach((id: string) => {
        this.categoryIdsArray.push(this.fb.control(id));
      });
    } else {
      console.warn('⚠️ No categories found or invalid format');
    }

    // Poblar amenidades
    this.amenityIdsArray.clear();
    if (normalizedListing.amenityIds && Array.isArray(normalizedListing.amenityIds)) {
      console.log(`🎯 Adding ${normalizedListing.amenityIds.length} amenities:`, normalizedListing.amenityIds);
      normalizedListing.amenityIds.forEach((id: string) => {
        this.amenityIdsArray.push(this.fb.control(id));
      });
    } else {
      console.warn('⚠️ No amenities found or invalid format');
    }

    // Poblar imágenes
    this.imagesArray.clear();
    this.uploadedImages = [];
    if (normalizedListing.images && Array.isArray(normalizedListing.images) && normalizedListing.images.length > 0) {
      console.log(`🖼️ Adding ${normalizedListing.images.length} images:`);

      // Log detallado de cada imagen
      normalizedListing.images.forEach((img: any, index: number) => {
        console.log(`  - Image ${index + 1}:`, {
          url: img.url,
          publicId: img.publicId,
          isPrimary: img.isPrimary
        });
      });

      // Encontrar imagen primaria o usar la primera como primaria
      let hasPrimary = normalizedListing.images.some((img: any) => img.isPrimary);
      console.log(`🌟 Has primary image: ${hasPrimary}`);

      normalizedListing.images.forEach((image: any, index: number) => {
        const isPrimary = hasPrimary ? (image.isPrimary || false) : (index === 0);
        this.addImageToFormForEdit(image, isPrimary);
      });
    } else {
      console.warn('⚠️ No images found in listing data');
    }

    // Log final del estado
    console.log('✅ Form populated successfully with summary:', {
      listingId: normalizedListing.id,
      title: normalizedListing.title,
      imagesCount: this.uploadedImages.length,
      categoriesCount: this.categoryIdsArray.length,
      amenitiesCount: this.amenityIdsArray.length,
      formValid: this.form.valid,
      formErrors: this.getFormErrors()
    });
  }

  private normalizeListingData(listing: any): any {
    // Normalizar diferentes formatos de datos que pueden venir del backend
    return {
      id: listing.id,
      title: listing.title,
      description: listing.description,
      location: {
        city: listing.location?.city || listing.city,
        country: listing.location?.country || listing.country,
        address: listing.location?.address || listing.address,
        latitude: listing.location?.latitude || listing.latitude,
        longitude: listing.location?.longitude || listing.longitude
      },
      price: {
        amount: listing.price?.amount || listing.priceAmount || 0,
        currency: listing.price?.currency || listing.priceCurrency || 'USD'
      },
      capacity: listing.capacity || 1,
      bedrooms: listing.bedrooms || 1,
      bathrooms: listing.bathrooms || 1,
      categoryIds: Array.isArray(listing.categoryIds) ? listing.categoryIds :
        Array.isArray(listing.categories) ? listing.categories.map((c: any) => c.id || c) : [],
      amenityIds: Array.isArray(listing.amenityIds) ? listing.amenityIds :
        Array.isArray(listing.amenities) ? listing.amenities.map((a: any) => a.id || a) : [],
      images: Array.isArray(listing.images) ? listing.images.map((img: any, index: number) => ({
        url: img.mediaUrl || img.url || img.src,
        mediaUrl: img.mediaUrl || img.url || img.src,
        publicId: img.publicId || '',
        isPrimary: img.isPrimary ?? (index === 0),
        displayOrder: img.displayOrder ?? index
      })) : []
    };
  }

  private clearFormState(): void {
    console.log('🧹 Clearing form state...');

    // Limpiar arrays de formulario
    this.categoryIdsArray.clear();
    this.amenityIdsArray.clear();
    this.imagesArray.clear();

    // Limpiar estado de imágenes
    this.uploadedImages = [];
    this.uploading = false;

    // Resetear paso actual y validaciones
    this.currentStep = 0;
    this.showValidationErrors = false;
    this.isSubmitting = false;

    console.log('✅ Form state cleared');
  }

  private addImageToFormForEdit(image: any, isPrimary: boolean = false): void {
    // Usar mediaUrl como fuente primaria (viene del backend)
    const imageUrl = image.mediaUrl || image.url;

    const imageGroup = this.fb.group({
      url: [imageUrl, Validators.required],
      mediaUrl: [imageUrl],
      publicId: [image.publicId || ''],
      isPrimary: [isPrimary],
      displayOrder: [image.displayOrder ?? this.uploadedImages.length]
    });

    this.imagesArray.push(imageGroup);
    this.uploadedImages.push({
      url: imageUrl,
      mediaUrl: imageUrl,
      publicId: image.publicId || '',
      isPrimary: isPrimary,
      displayOrder: image.displayOrder ?? this.uploadedImages.length
    } as any);
  }

  isFieldInvalid(fieldPath: string): boolean {
    const field = this.form.get(fieldPath);
    return !!(field && field.invalid && (field.dirty || field.touched || this.showValidationErrors));
  }

  getFieldError(fieldPath: string): string {
    const field = this.form.get(fieldPath);
    if (field?.errors) {
      if (field.errors['required']) return 'Este campo es requerido';
      if (field.errors['minlength']) return `Debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['min']) return `Debe ser mayor a ${field.errors['min'].min}`;
      if (field.errors['max']) return `Debe ser menor a ${field.errors['max'].max}`;
    }
    return '';
  }

  canProceedToNextStep(): boolean {
    const isValid = this.isCurrentStepValid();
    return isValid === true;
  }

  canSubmitForm(): boolean {
    return this.form.valid && !this.isSubmitting;
  }

  get progressPercentage(): number {
    return ((this.currentStep + 1) / this.steps.length) * 100;
  }

  get isFirstStep(): boolean {
    return this.currentStep === 0;
  }

  get isLastStep(): boolean {
    return this.currentStep === this.steps.length - 1;
  }

  private setHostId(): void {
    this.authService.getCurrentUser().pipe(take(1)).subscribe({
      next: (result) => {
        if (result.success && result.data) {
          const userId = String(result.data.id); // Convertir a string para compatibilidad
          this.currentHostId = userId;
          this.form.patchValue({ hostId: result.data.id }); // El form puede aceptar number

          // Solo cargar estado guardado si NO estamos en modo edición
          // y el estado pertenece al usuario actual
          if (!this.isEditMode) {
            if (this.formStateService.isStateValidForUser(userId)) {
              this.loadSavedState();
            } else {
              console.log('🔄 No valid saved state for current user, starting fresh');
            }
          }
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
    const displayOrder = this.imagesArray.length;

    const imageGroup = this.fb.group({
      url: [image.url, Validators.required],
      mediaUrl: [image.url], // Para compatibilidad con backend
      publicId: [image.publicId || ''],
      isPrimary: [isFirst],
      displayOrder: [displayOrder]
    });

    this.imagesArray.push(imageGroup);
    this.uploadedImages.push({
      ...image,
      mediaUrl: image.url,
      isPrimary: isFirst,
      displayOrder: displayOrder
    } as any);
  }

  removeImage(index: number): void {
    const imageToRemove = this.uploadedImages[index];

    if (imageToRemove.publicId) {
      this.deleteCloudinaryUseCase.execute(imageToRemove.publicId).subscribe({
        next: () => {
          this.imagesArray.removeAt(index);
          this.uploadedImages.splice(index, 1);

          if (this.uploadedImages.length > 0 && !this.uploadedImages.some(img => img.isPrimary)) {
            this.setPrimaryImage(0);
          }
        },
        error: () => {
          this.imagesArray.removeAt(index);
          this.uploadedImages.splice(index, 1);

          if (this.uploadedImages.length > 0 && !this.uploadedImages.some(img => img.isPrimary)) {
            this.setPrimaryImage(0);
          }
        }
      });
    } else {
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
    this.showValidationErrors = true;

    if (this.isCurrentStepValid()) {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
        this.showValidationErrors = false;
      }
    } else {
      this.markCurrentStepAsTouched();
      this.scrollToFirstError();
    }
  }

  private scrollToFirstError(): void {
    setTimeout(() => {
      const firstErrorElement = document.querySelector('.form-error, .validation-error');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
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
      case 0:
        return this.form.get('title')?.valid && this.form.get('description')?.valid;
      case 1:
        return this.categoryIdsArray.length > 0;
      case 2:
        return this.form.get('location')?.valid;
      case 3:
        return this.form.get('capacity')?.valid &&
          this.form.get('bedrooms')?.valid &&
          this.form.get('bathrooms')?.valid;
      case 4:
        return this.amenityIdsArray.length > 0;
      case 5:
        return this.form.get('price')?.valid;
      case 6:
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
    this.showValidationErrors = true;

    if (this.form.valid) {
      this.isSubmitting = true;
      const payload = this.normalizePayload(this.form.value);

      // Log detallado del payload para debug del backend
      console.log('📝 PAYLOAD COMPLETO PARA ENVIAR:');
      console.log('- Título:', payload.title);
      console.log('- Descripción:', payload.description);
      console.log('- Ubicación:', payload.location);
      console.log('- Precio:', payload.price);
      console.log('- Capacidad:', payload.capacity);
      console.log('- Dormitorios:', payload.bedrooms);
      console.log('- Baños:', payload.bathrooms);
      console.log('- Host ID:', payload.hostId);
      console.log('- Category IDs:', payload.categoryIds);
      console.log('- Amenity IDs:', payload.amenityIds);
      console.log('- Imágenes (count):', payload.images?.length || 0);

      if (payload.images && payload.images.length > 0) {
        console.log('🖼️ DETALLE DE IMÁGENES:');
        payload.images.forEach((img: CloudinaryImage, index: number) => {
          console.log(`  - Imagen ${index + 1}:`, {
            url: img.url,
            publicId: img.publicId,
            isPrimary: img.isPrimary
          });
        });
      }

      console.log('📦 PAYLOAD JSON COMPLETO:', JSON.stringify(payload, null, 2));

      if (this.isEditMode && this.listingId) {
        // Usar el método buildUpdatePayload para construir payload compatible con backend
        const updateCommand = this.buildUpdatePayload(this.form.value);

        console.log('🔄 ACTUALIZANDO LISTING:', this.listingId);
        console.log('📤 Update Command:', JSON.stringify(updateCommand, null, 2));

        this.updateListingUseCase.execute(updateCommand).subscribe({
          next: (response) => {
            console.log('📥 Update response:', response);
            if (response.success) {
              console.log('✅ Listing updated successfully!');

              // Limpiar datos de edición del localStorage
              localStorage.removeItem('listing-edit-data');

              this.isSubmitting = false;
              this.router.navigate(['/host']);
            } else {
              console.error('❌ Failed to update listing:', response.message);
              this.isSubmitting = false;
              alert(`Error al actualizar: ${response.message || 'Error desconocido'}`);
            }
          },
          error: (error) => {
            console.error('❌ Error updating listing:', error);
            console.error('📋 Error details:', {
              status: error.status,
              statusText: error.statusText,
              message: error.error?.message,
              fullError: error
            });
            this.isSubmitting = false;
            const errorMessage = error.error?.message || error.message || 'Error de conexión';
            alert(`Error al actualizar el listing: ${errorMessage}`);
          }
        });
      } else {
        const createCommand: CreateListingCommand = payload;

        console.log('🆕 CREANDO NUEVO LISTING');
        console.log('📤 Create Command:', JSON.stringify(createCommand, null, 2));

        this.createListingUseCase.execute(createCommand).subscribe({
          next: (response) => {
            console.log('📥 Create response:', response);
            if (response.success) {
              console.log('✅ Listing created successfully!');
              console.log('🆔 Created listing ID:', response.data?.id);

              // Limpieza completa después de crear el listing exitosamente
              console.log('🧹 Performing complete cleanup after creation...');

              // 1. Limpiar todo el localStorage relacionado con el formulario
              this.formStateService.clearAllFormData();

              // 2. Resetear el formulario completamente
              this.form.reset();

              // 3. Limpiar arrays del formulario
              this.categoryIdsArray.clear();
              this.amenityIdsArray.clear();
              this.imagesArray.clear();

              // 4. Limpiar imágenes subidas
              this.uploadedImages = [];

              // 5. Volver al primer paso
              this.currentStep = 0;

              // 6. Resetear flags
              this.showValidationErrors = false;
              this.isSubmitting = false;

              // 7. Reconfigurar hostId para el siguiente uso
              if (this.currentHostId) {
                this.form.patchValue({ hostId: this.currentHostId });
              }

              console.log('✅ Complete cleanup done - form ready for new listing');

              // Navegar a la página de host
              this.router.navigate(['/host']);
            } else {
              console.error('Failed to create listing:', response.message);
              this.isSubmitting = false;
              alert(`Error al crear: ${response.message || 'Error desconocido'}`);
            }
          },
          error: (error) => {
            console.error('Error creating listing:', error);
            console.error('Error details:', {
              status: error.status,
              statusText: error.statusText,
              message: error.error?.message,
              fullError: error
            });
            this.isSubmitting = false;
            const errorMessage = error.error?.message || error.message || 'Error de conexión';

            // Si es el error específico del listing_id nulo
            if (error.error?.message?.includes('listing_id') && error.error?.message?.includes('nulo')) {
              console.error('PROBLEMA ESPECÍFICO: listing_id está siendo nulo al crear las imágenes');
              console.error('Esto sugiere que el listing no se está creando antes que las imágenes');
              console.error('Verificar el orden de creación en el backend');
            }

            alert(`Error al crear el listing: ${errorMessage}`);
          }
        });
      }
    } else {
      this.form.markAllAsTouched();
      this.scrollToFirstError();
      console.warn('⚠Form is invalid, cannot submit');
      console.log('Form errors:', this.getFormErrors());
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

  /**
   * Construye el payload para actualización compatible con el backend UpdateListingDTO
   * Transforma: price.amount → priceAmount, price.currency → priceCurrency
   * Transforma: images[].url → images[].mediaUrl
   * NOTA: El ID NO va en el body, va en la URL del endpoint
   */
  private buildUpdatePayload(formValue: any): UpdateListingCommand {
    // Asegurar que priceAmount sea un número válido para BigDecimal
    const priceAmount = Number(formValue.price?.amount);
    if (isNaN(priceAmount) || priceAmount <= 0) {
      console.error('⚠️ Invalid price amount:', formValue.price?.amount);
      throw new Error('El precio debe ser un número mayor a 0');
    }

    // Normalizar coordenadas - deben ser números o null para BigDecimal
    const latitude = this.normalizeCoordinate(formValue.location?.latitude);
    const longitude = this.normalizeCoordinate(formValue.location?.longitude);

    const payload = {
      id: this.listingId!, // Solo para el UpdateListingCommand, no se envía en el body
      title: formValue.title?.trim(),
      description: formValue.description?.trim(),
      location: {
        city: formValue.location?.city?.trim(),
        country: formValue.location?.country?.trim(),
        address: formValue.location?.address?.trim(),
        latitude: latitude,
        longitude: longitude
      },
      priceAmount: priceAmount,
      priceCurrency: formValue.price?.currency || 'USD',
      capacity: Number(formValue.capacity) || 1,
      bedrooms: Number(formValue.bedrooms) || 0,
      bathrooms: Number(formValue.bathrooms) || 0,
      categoryIds: formValue.categoryIds || [],
      amenityIds: formValue.amenityIds || [],
      images: (formValue.images || []).map((img: any, index: number) => ({
        mediaUrl: img.mediaUrl || img.url,
        publicId: img.publicId || '',
        isPrimary: img.isPrimary || false,
        displayOrder: index
      }))
    };

    console.log('🔍 Payload validation:');
    console.log('  - Title:', payload.title, '(length:', payload.title?.length, ')');
    console.log('  - Description length:', payload.description?.length);
    console.log('  - Location:', payload.location);
    console.log('  - Price:', payload.priceAmount, typeof payload.priceAmount);
    console.log('  - Capacity/Bedrooms/Bathrooms:', payload.capacity, payload.bedrooms, payload.bathrooms);
    console.log('  - Categories:', payload.categoryIds);
    console.log('  - Amenities:', payload.amenityIds);
    console.log('  - Images count:', payload.images?.length);

    // Validar restricciones del backend
    if (!payload.title || payload.title.length < 10 || payload.title.length > 100) {
      console.error('⚠️ Title validation failed:', payload.title);
      throw new Error('El título debe tener entre 10 y 100 caracteres');
    }

    if (!payload.description || payload.description.length < 50 || payload.description.length > 1000) {
      console.error('⚠️ Description validation failed, length:', payload.description?.length);
      throw new Error('La descripción debe tener entre 50 y 1000 caracteres');
    }

    return payload;
  }

  private normalizeCoordinate(value: any): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const normalized = String(value).replace(',', '.');
    const parsed = parseFloat(normalized);

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

  private saveCurrentState(): void {
    const state: ListingFormState = {
      formData: this.form.value,
      uploadedImages: this.uploadedImages,
      currentStep: this.currentStep,
      lastSaved: new Date(),
      hostId: this.currentHostId // Guardar hostId para validar usuario
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
    }
  }

  // Método para debugging del estado del formulario
  debugFormState(): void {
    console.log('🔍 FORM DEBUG STATE:', {
      isEditMode: this.isEditMode,
      listingId: this.listingId,
      currentStep: this.currentStep,
      formValid: this.form.valid,
      formValue: this.form.value,
      uploadedImages: this.uploadedImages,
      categoriesLength: this.categoryIdsArray.length,
      amenitiesLength: this.amenityIdsArray.length,
      imagesLength: this.imagesArray.length,
      formErrors: this.getFormErrors()
    });
  }

  // Método para probar validaciones
  testFormValidation(): void {
    console.log('🧪 TESTING FORM VALIDATION...');

    // Marcar todos los campos como touched para mostrar errores
    this.form.markAllAsTouched();
    this.showValidationErrors = true;

    // Mostrar errores específicos por paso
    this.steps.forEach((step, index) => {
      console.log(`Step ${index} (${step.title}) - Valid:`, this.isStepValid(index));
    });

    // Mostrar detalles de validación
    this.debugFormState();
  }

  // Helper para obtener errores del formulario
  private getFormErrors(): any {
    const formErrors: any = {};

    Object.keys(this.form.controls).forEach(key => {
      const controlErrors = this.form.get(key)?.errors;
      if (controlErrors) {
        formErrors[key] = controlErrors;
      }
    });

    return formErrors;
  }

  // Helper para validar un paso específico
  private isStepValid(stepIndex: number): boolean {
    switch (stepIndex) {
      case 0: return !!(this.form.get('title')?.valid && this.form.get('description')?.valid);
      case 1: return this.categoryIdsArray.length > 0;
      case 2: return !!this.form.get('location')?.valid;
      case 3: return !!(this.form.get('capacity')?.valid && this.form.get('bedrooms')?.valid && this.form.get('bathrooms')?.valid);
      case 4: return this.amenityIdsArray.length > 0;
      case 5: return !!this.form.get('price')?.valid;
      case 6: return this.imagesArray.length > 0;
      default: return false;
    }
  }
}
