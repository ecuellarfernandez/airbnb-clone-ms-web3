import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Listing } from '@features/listings/domain/models/listing.model';
import { GetListingByIdUseCase } from '@features/listings/application/use-cases/get-listing-by-id.use-case';

@Component({
    selector: 'app-reservation-checkout-page',
    templateUrl: './reservation-checkout-page.component.html',
    standalone: false,
    styleUrls: ['./reservation-checkout-page.component.scss'],
})
export class ReservationCheckoutPageComponent implements OnInit {

    listing!: Listing | undefined;

    paymentForm!: FormGroup;

    checkIn: Date | null = null;
    checkOut: Date | null = null;

    adults = 1;
    children = 0;
    infants = 0;
    pets = 0;

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private getListingByIdUseCase: GetListingByIdUseCase,
        private location: Location,
    ) { }

    ngOnInit(): void {
        this.buildForm();

        this.route.queryParamMap.subscribe(params => {
            const listingId = Number(params.get('listingId'));
            const checkInParam = params.get('checkIn');
            const checkOutParam = params.get('checkOut');

            this.adults = Number(params.get('adults') ?? 1);
            this.children = Number(params.get('children') ?? 0);
            this.infants = Number(params.get('infants') ?? 0);
            this.pets = Number(params.get('pets') ?? 0);

            if (checkInParam) this.checkIn = new Date(checkInParam);
            if (checkOutParam) this.checkOut = new Date(checkOutParam);

            if (listingId) {
                this.listing = this.getListingByIdUseCase.execute(listingId);
            }
        });
    }

    private buildForm(): void {
        this.paymentForm = this.fb.group({
            cardNumber: ['', [Validators.required]],
            expiry: ['', [Validators.required]],
            cvv: ['', [Validators.required]],
            address: ['', [Validators.required]],
            apartment: [''],
            city: ['', [Validators.required]],
            state: ['', [Validators.required]],
            postalCode: ['', [Validators.required]],
            country: ['Bolivia', [Validators.required]],
        });
    }

    get totalGuests(): number {
        return this.adults + this.children + this.infants + this.pets;
    }

    get guestsLabel(): string {
        const parts: string[] = [];

        if (this.adults > 0)
            parts.push(`${this.adults} adulto${this.adults > 1 ? 's' : ''}`);

        if (this.children > 0)
            parts.push(`${this.children} niño${this.children > 1 ? 's' : ''}`);

        if (this.infants > 0)
            parts.push(`${this.infants} bebé${this.infants > 1 ? 's' : ''}`);

        if (this.pets > 0)
            parts.push(`${this.pets} mascota${this.pets > 1 ? 's' : ''}`);

        return parts.length > 0
            ? parts.join(', ')
            : `${this.totalGuests} huésped${this.totalGuests !== 1 ? 'es' : ''}`;
    }

    get nights(): number | null {
        if (!this.checkIn || !this.checkOut) return null;
        const diffMs = this.checkOut.getTime() - this.checkIn.getTime();
        const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : null;
    }

    get totalPrice(): number | null {
        if (!this.listing || !this.nights) return null;
        return this.listing.price * this.nights;
    }

    onSubmit(): void {
        if (this.paymentForm.invalid || !this.listing) {
            this.paymentForm.markAllAsTouched();
            return;
        }

        console.log('Solicitud de reserva', {
            listing: this.listing,
            checkIn: this.checkIn,
            checkOut: this.checkOut,
            guests: {
                adults: this.adults,
                children: this.children,
                infants: this.infants,
                pets: this.pets,
            },
            payment: this.paymentForm.value,
        });
    }

    goBack(): void {
        this.location.back();
    }
}