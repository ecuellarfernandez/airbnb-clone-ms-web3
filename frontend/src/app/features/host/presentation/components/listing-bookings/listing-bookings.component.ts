import { Component, inject, Input, OnInit } from '@angular/core';
import { ReservationsApiService } from '@app/features/reservations/domain/models/services/reservations-api.service';
import { Reservation } from '@app/features/reservations/domain/models/reservation.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listing-bookings',
  imports: [CommonModule],
  templateUrl: './listing-bookings.component.html',
  styleUrl: './listing-bookings.component.scss',
})
export class ListingBookingsComponent implements OnInit {
  @Input() listingId!: string;
  reservations: Reservation[] = [];
  loading = false;
  error: string | null = null;

  reservationsApi: ReservationsApiService = inject(ReservationsApiService);

  ngOnInit(): void {
    if (!this.listingId) return;
    this.fetchReservations();
  }

  fetchReservations() {
    this.loading = true;
    this.error = null;
    // You may need to implement a getReservationsByListingId in ReservationsApiService
    this.reservationsApi.getByListingId(this.listingId).subscribe({
      next: (res) => {
        console.log("Reservas", res);
        this.reservations = res.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading reservations';
        this.loading = false;
      }
    });
  }
}
