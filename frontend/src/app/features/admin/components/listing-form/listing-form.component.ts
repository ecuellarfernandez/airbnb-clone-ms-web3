import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Listing } from '@listings/data-access/models/listing.model';

@Component({
    selector: 'app-listing-form',
    standalone: true,                             
    imports: [CommonModule, ReactiveFormsModule], 
    templateUrl: './listing-form.component.html',
    styleUrls: ['./listing-form.component.scss']
})
export class ListingFormComponent implements OnChanges {
    @Input() value?: Listing;
    @Output() cancel = new EventEmitter<void>();
    @Output() submitForm = new EventEmitter<Partial<Listing>>();

    form!: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            city: ['Santa Cruz', Validators.required],
            price: [100, [Validators.required, Validators.min(0)]],
            capacity: [2, [Validators.required, Validators.min(1)]],
            image: ['', Validators.required],
            description: [''],
            photos: ['']
        });
    }

    ngOnChanges(): void {
        if (this.value) {
            this.form.patchValue({
                title: this.value.title,
                city: this.value.city,
                price: this.value.price,
                capacity: this.value.capacity,
                image: this.value.image,
                description: this.value.description,
                photos: (this.value.photos ?? []).join(', ')
            });
        } else {
            this.form.reset({ city: 'Santa Cruz', price: 100, capacity: 2 });
        }
    }

    submit(): void {
        if (this.form.invalid) return;
        const v = this.form.value;
        const photos = (v.photos || '')
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean);

        this.submitForm.emit({
            title: v.title || '',
            city: v.city || '',
            price: v.price || 0,
            capacity: v.capacity || 1,
            image: v.image || '',
            description: v.description || '',
            photos
        });
    }
}
