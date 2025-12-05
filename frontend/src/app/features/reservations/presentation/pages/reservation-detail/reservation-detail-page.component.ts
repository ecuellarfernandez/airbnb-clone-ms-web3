import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReservationsService } from '@features/reservations/domain/services/reservations.service';
import { BookingDetail } from '@features/reservations/domain/models/reservation.model';

@Component({
  selector: 'app-reservation-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, CurrencyPipe],
  templateUrl: './reservation-detail-page.component.html',
  styleUrls: ['./reservation-detail-page.component.scss']
})
export class ReservationDetailPageComponent implements OnInit {
  booking: BookingDetail | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationsService: ReservationsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadBooking(id);
    } else {
      this.error = 'No se encontró el ID de la reserva';
      this.loading = false;
    }
  }

  private loadBooking(id: string): void {
    this.loading = true;
    this.error = null;

    this.reservationsService.getBookingById(id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.booking = response.data;
        } else {
          this.error = response.message || 'Error al cargar la reserva';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading booking:', err);
        this.error = 'Error al cargar los detalles de la reserva';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/reservations']);
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }

  getStatusLabel(status: string): string {
    const statusLabels: Record<string, string> = {
      'PENDING': 'Pendiente',
      'CONFIRMED': 'Confirmada',
      'CANCELLED': 'Cancelada',
      'COMPLETED': 'Completada'
    };
    return statusLabels[status] || status;
  }
}
