import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Listing } from '@features/listings/domain/models/listing.model';

interface Amenity {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-listing-form',
  templateUrl: './listing-form.component.html',
  standalone: false,
  styleUrls: ['./listing-form.component.scss'],
})
export class ListingFormComponent implements OnInit {
  @Input() value: Listing | null | undefined = null;
  @Output() cancel = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<Partial<Listing>>();

  form!: FormGroup;

  currentStep = 1;
  readonly maxStep = 4;
  readonly steps = [1, 2, 3, 4];

  propertyTypes: string[] = [
    'Casa completa',
    'Apartamento',
    'Habitación privada',
    'Habitación compartida',
    'Cabaña',
    'Villa'  
];

  amenitiesList: Amenity[] = [
    { id: 'wifi', label: 'WiFi', icon: 'icon-wifi' },
    { id: 'parking', label: 'Estacionamiento', icon: 'icon-parking' },
    { id: 'kitchen', label: 'Cocina', icon: 'icon-kitchen' },
    { id: 'tv', label: 'TV', icon: 'icon-tv' },
    { id: 'ac', label: 'Aire acondicionado', icon: 'icon-ac' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      // Paso 1
      propertyType: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(120)]],
      description: ['', [Validators.required, Validators.maxLength(800)]],
      image: [''],

      // Paso 2
      address: ['', Validators.required],
      city: ['', [Validators.required, Validators.maxLength(80)]],
      country: ['', Validators.required],

      // Paso 3
      guests: [1, [Validators.required, Validators.min(1)]],
      bedrooms: [1, [Validators.required, Validators.min(0)]],
      beds: [1, [Validators.required, Validators.min(1)]],
      bathrooms: [1, [Validators.required, Validators.min(1)]],
      amenities: [[] as string[]],

      // Paso 4
      price: [0, [Validators.required, Validators.min(1)]],
      houseRules: [''],
    });

    if (this.value) {
      this.form.patchValue({
        title: this.value.title,
        city: this.value.city,
        description: this.value.description,
        price: this.value.price,
        guests: this.value.capacity,
        image: this.value.image,
      });
    }
  }

  nextStep(): void {
    this.currentStep = Math.min(this.currentStep + 1, this.maxStep);
  }

  prevStep(): void {
    this.currentStep = Math.max(this.currentStep - 1, 1);
  }

  selectPropertyType(type: string): void {
    this.form.patchValue({ propertyType: type });
  }


  toggleAmenity(amenityId: string): void {
    const current: string[] = this.form.value.amenities ?? [];
    const exists = current.includes(amenityId);
    const next = exists
      ? current.filter((id) => id !== amenityId)
      : [...current, amenityId];

    this.form.patchValue({ amenities: next });
  }

  isAmenitySelected(id: string): boolean {
    return (this.form.value.amenities ?? []).includes(id);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onSubmit(): void {
    if (this.currentStep < this.maxStep) {
      this.nextStep();
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.value;

    const payload: Partial<Listing> = {
      title: v.title,
      city: v.city,
      description: v.description,
      price: v.price,
      capacity: v.guests,
      image: v.image || '',
    };

    this.submitForm.emit(payload);
  }
}
