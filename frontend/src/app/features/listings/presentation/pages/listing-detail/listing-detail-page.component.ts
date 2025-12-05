import { Component, HostListener, OnInit } from "@angular/core";
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Listing } from '@features/listings/domain/models/listing.model';
import { ReservationsApiService, CreateReservationPayload } from '@features/reservations/domain/models/services/reservations-api.service';
import { ListingsApiService } from '@features/listings/domain/services/listings-api.service'

interface BookPayload {
    dateRange: { checkIn: Date | null; checkOut: Date | null };
    guests: { adults: number; children: number; infants: number; pets: number };
}

@Component({
    selector: 'app-listing-detail-page',
    standalone: false,
    templateUrl: './listing-detail-page.component.html',
    styleUrls: ['./listing-detail-page.component.scss']
})
export class ListingDetailPageComponent implements OnInit {
    loading = true;
    listing?: Listing;

    reservationId: string | null = null;
    amountFromMs: number | null = null;

    allPhotos: string[] = [];
    visibleThumbs = 3;
    showLigthbox = false;
    currentPhotoIndex = 0;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private listingsApi: ListingsApiService,
        private reservationsApi: ReservationsApiService,
    ) { }

    ngOnInit(): void {
        const listingId = this.route.snapshot.paramMap.get('id');

        if (!listingId) {
            this.back();
            return;
        }

        this.loading = true;

        this.listingsApi.getById(listingId).subscribe({
            next: (result) => {
                this.listing = result;

                const extras = this.listing?.photos ?? [];
                this.allPhotos = [this.listing?.image ?? '', ...extras];

                this.loading = false;
            },
            error: (error) => {
                console.error('Error al obtener listing desde el microservicio', error);
                this.back();
            }
        });
    }

    get totalPhotos(): number {
        return this.allPhotos.length;
    }

    get showCount(): number {
        return 1 + Math.min(this.visibleThumbs, (this.listing?.photos?.length ?? 0));
    }

    get remainingCount(): number {
        return Math.max(0, this.totalPhotos - this.showCount);
    }

    back(): void {
        this.location.back();
    }

    bookDemo(payload: BookPayload): void {
        if (!this.listing) return;

        const { dateRange, guests } = payload;

        if (!dateRange.checkIn || !dateRange.checkOut) {
            alert('Por favor selecciona la fecha de llegada y de salida');
            return;
        }

        const { checkIn, checkOut } = dateRange;

        const diffMs = checkOut.getTime() - checkIn.getTime();
        const nights = Math.round(diffMs / (1000 * 60 * 60 * 24));

        if (nights <= 0) {
            alert('Las fechas seleccionadas no son válidas.');
            return;
        }

        const baseAmount = this.listing.price * nights;
        console.log('Noches:', nights, 'Precio por noche:', this.listing.price, 'Total calculado (amount):', baseAmount);

        const totalGuests = guests.adults + guests.children + guests.infants + guests.pets;
        const listingId = String(this.listing.id);

        const body: CreateReservationPayload = {
            listingId: listingId,
            checkIn: checkIn.toISOString().slice(0, 10),
            checkOut: checkOut.toISOString().slice(0, 10),
            guests: totalGuests,
        };

        this.reservationsApi.createReservation(body).subscribe({
            next: (response: any) => {
                console.log('Reserva creada:', response);

                const reservation = response.data ?? response;
                const reservationId = reservation.id ?? reservation.reservation_id ?? '';

                const backendAmount = reservation.total ?? reservation.amount;
                const amount =
                    typeof backendAmount === 'number' && !Number.isNaN(backendAmount)
                        ? backendAmount
                        : baseAmount;

                console.log('Amount desde MS:', backendAmount, 'Amount final que se enviará al checkout:', amount);

                if (!reservationId) {
                    alert('La reserva se creó pero no llegó el id en la respuesta. Revisa el backend.');
                    return;
                }

                this.router.navigate(['/reservations/checkout'], {
                    queryParams: {
                        reservationId,
                        amount, 
                        listingId: this.listing!.id,
                        checkIn: checkIn.toISOString(),
                        checkOut: checkOut.toISOString(),
                        adults: guests.adults,
                        children: guests.children,
                        infants: guests.infants,
                        pets: guests.pets,
                    }
                });
            },
            error: (err) => {
                console.error('Error al crear la reserva', err);
                console.error('Detalle del error del backend:', err.error);
                alert(err.error?.message ?? 'Ocurrió un error al crear la reserva.');
            },
        });
    }

    openLightbox(index = 0): void {
        this.currentPhotoIndex = index;
        this.showLigthbox = true;
    }

    closeLightbox(ev?: Event): void {
        ev?.stopPropagation();
        this.showLigthbox = false;
    }

    prev(ev?: Event): void {
        ev?.stopPropagation();
        this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.totalPhotos) % this.totalPhotos;
    }

    next(ev?: Event): void {
        ev?.stopPropagation();
        this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.totalPhotos;
    }

    @HostListener('document:keydown.arrowleft') onLeft() {
        if (this.showLigthbox) this.prev();
    }
    @HostListener('document:keydown.arrowright') onRight() {
        if (this.showLigthbox) this.next();
    }
    @HostListener('document:keydown.escape') onEsc() {
        if (this.showLigthbox) this.showLigthbox = false;
    }
}
