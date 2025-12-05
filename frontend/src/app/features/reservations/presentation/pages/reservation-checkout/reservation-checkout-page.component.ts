import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Listing } from '@features/listings/domain/models/listing.model';
import { GetListingByIdUseCase } from '@features/listings/application/use-cases/get-listing-by-id.use-case';
import {
    ReservationsApiService,
    PaymentReservationPayload,
} from '@features/reservations/domain/models/services/reservations-api.service';
import { AuthService } from '@features/auth/domain/services/auth.service';
import { User } from '@app/features/users/domain/models/user.model';

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

    reservationId: string | null = null;
    amount: number | null = null;

    currentUser: User | null = null;

    // Modal properties
    modalOpen = false;
    modalTitle = '';
    modalMessage = '';
    modalConfirmText = 'Aceptar';
    modalCancelText = 'Cancelar';
    modalIsDanger = false;
    modalShowCancel = true;
    private modalCallback: (() => void) | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private getListingByIdUseCase: GetListingByIdUseCase,
        private location: Location,
        private reservationsApi: ReservationsApiService,
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.buildForm();

        this.currentUser = this.authService.getUser();

        this.route.queryParamMap.subscribe(params => {
            const listingId = params.get('listingId');
            const checkInParam = params.get('checkIn');
            const checkOutParam = params.get('checkOut');

            this.reservationId = params.get('reservationId');
            const amountParam = params.get('amount');
            this.amount = amountParam ? Number(amountParam) : null;

            this.adults = Number(params.get('adults') ?? 1);
            this.children = Number(params.get('children') ?? 0);
            this.infants = Number(params.get('infants') ?? 0);
            this.pets = Number(params.get('pets') ?? 0);

            if (checkInParam) this.checkIn = new Date(checkInParam);
            if (checkOutParam) this.checkOut = new Date(checkOutParam);

            if (listingId) {
                this.listing = this.getListingByIdUseCase.execute(String(listingId));
            }

            console.log('=== CHECKOUT INIT ===');
            console.log('Query params listingId:', listingId);
            console.log('Query params reservationId:', this.reservationId);
            console.log('Query params amount (string):', amountParam);
            console.log('amount (number):', this.amount);
            console.log('checkIn:', this.checkIn);
            console.log('checkOut:', this.checkOut);
            console.log('adults:', this.adults, 'children:', this.children, 'infants:', this.infants, 'pets:', this.pets);
            console.log('Listing cargado?', !!this.listing, this.listing);
            console.log('======================');
        });
    }

    private buildForm(): void {
        this.paymentForm = this.fb.group({
            cardNumber: ['', [Validators.required]],
            expiry: ['', [Validators.required]],
            cvv: ['', [Validators.required]],
            address: [''],
            apartment: [''],
            city: [''],
            state: [''],
            postalCode: [''],
            country: ['Bolivia'],
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
        console.log('=== onSubmit() ===');
        console.log('paymentForm valid?:', this.paymentForm.valid);
        console.log('paymentForm value:', this.paymentForm.value);
        console.log('listing existe?:', !!this.listing);
        console.log('reservationId:', this.reservationId);
        console.log('amount:', this.amount);
        console.log('currentUser:', this.currentUser);

        Object.keys(this.paymentForm.controls).forEach(name => {
            const control = this.paymentForm.get(name);
            console.log(
                `control "${name}" -> value:`,
                control?.value,
                '| valid:',
                control?.valid,
                '| errors:',
                control?.errors
            );
        });

        if (
            this.paymentForm.invalid ||
            !this.reservationId ||
            this.amount == null
        ) {
            console.log('Alguna condición básica falló:');
            console.log('- paymentForm.invalid:', this.paymentForm.invalid);
            console.log('- !reservationId:', !this.reservationId);
            console.log('- amount == null:', this.amount == null);

            this.paymentForm.markAllAsTouched();
            this.showModal('Datos incompletos', 'Falta información para procesar el pago. Por favor completa todos los campos requeridos.', { isDanger: true });
            return;
        }

        if (this.currentUser) {
            this.processPayment();
            return;
        }

        if (this.authService.isAuthenticated()) {
            console.log('No había currentUser, llamando a /me antes de pagar...');
            this.authService.getCurrentUser().subscribe({
                next: (res) => {
                    if (res.success && res.data) {
                        this.currentUser = res.data;
                        console.log('Usuario obtenido en onSubmit:', this.currentUser);
                        this.processPayment();
                    } else {
                        console.warn('No se pudo obtener el usuario actual:', res.errorMessage);
                        this.showModal('Error', 'No se pudo obtener la información del usuario. Intenta iniciar sesión de nuevo.', { isDanger: true });
                    }
                },
                error: (err) => {
                    console.error('Error al obtener el usuario actual:', err);
                    this.showModal('Error', 'Error al obtener la información del usuario. Intenta iniciar sesión de nuevo.', { isDanger: true });
                },
            });
            return;
        }

        this.showModal('Inicio de sesión requerido', 'Debes iniciar sesión para poder pagar la reserva.', { isDanger: true });
    }

    private processPayment(): void {
        if (!this.currentUser) {
            console.error('processPayment llamado sin currentUser');
            this.showModal('Error', 'No se pudo procesar el pago. Intenta iniciar sesión nuevamente.', { isDanger: true });
            return;
        }

        const payload: PaymentReservationPayload = {
            reservation_id: this.reservationId!,
            amount: this.amount!,
            user_id: this.currentUser.id,
            card: {
                number: this.paymentForm.value.cardNumber,
                expiry: this.paymentForm.value.expiry,
                cvv: this.paymentForm.value.cvv,
            },
        };

        console.log('Enviando pago de reserva (payload):', payload);

        this.reservationsApi.payReservation(payload).subscribe({
            next: (resp) => {
                console.log('Respuesta payments OK:', resp);
                this.showModal('¡Pago exitoso!', 'Tu reserva ha sido procesada correctamente.', {
                    confirmText: 'Ir al inicio',
                    onConfirm: () => this.router.navigate(['/home'])
                });
            },
            error: (err) => {
                console.error('Error al procesar el pago', err);
                const msg =
                    err.error?.message ??
                    'Ocurrió un error al procesar el pago. Verifica los datos de la tarjeta.';
                this.showModal('Error en el pago', msg, { isDanger: true });
            },
        });
    }

    goBack(): void {
        this.location.back();
    }

    // Modal methods
    showModal(
        title: string,
        message: string,
        options: {
            confirmText?: string;
            cancelText?: string;
            isDanger?: boolean;
            showCancel?: boolean;
            onConfirm?: () => void;
        } = {}
    ): void {
        this.modalTitle = title;
        this.modalMessage = message;
        this.modalConfirmText = options.confirmText ?? 'Aceptar';
        this.modalCancelText = options.cancelText ?? 'Cancelar';
        this.modalIsDanger = options.isDanger ?? false;
        this.modalShowCancel = options.showCancel ?? false;
        this.modalCallback = options.onConfirm ?? null;
        this.modalOpen = true;
    }

    onModalConfirm(): void {
        this.modalOpen = false;
        if (this.modalCallback) {
            this.modalCallback();
        }
    }

    onModalCancel(): void {
        this.modalOpen = false;
        this.modalCallback = null;
    }
}
