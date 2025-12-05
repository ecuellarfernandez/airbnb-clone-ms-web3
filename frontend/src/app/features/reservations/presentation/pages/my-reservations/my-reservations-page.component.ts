import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReservationsService } from '../../../domain/services/reservations.service';
import { BookingSummary, BookingStatus } from '../../../domain/models/reservation.model';

@Component({
  selector: 'app-my-reservations-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-reservations-page.component.html',
  styleUrls: ['./my-reservations-page.component.scss']
})
export class MyReservationsPageComponent implements OnInit {
  reservations: BookingSummary[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private reservationsService: ReservationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.reservationsService.getMyReservations().subscribe({
      next: (response) => {
        if (response.success) {
          this.reservations = response.data;
        } else {
          this.errorMessage = response.message || 'Error al cargar las reservas';
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar las reservas. Por favor, intenta de nuevo.';
        this.isLoading = false;
        console.error('Error loading reservations:', error);
      }
    });
  }

  getStatusLabel(status: BookingStatus): string {
    const labels: Record<BookingStatus, string> = {
      PENDING: 'Pendiente',
      CONFIRMED: 'Confirmada',
      CANCELLED: 'Cancelada',
      COMPLETED: 'Completada'
    };
    return labels[status] || status;
  }

  getStatusClass(status: BookingStatus): string {
    return `status-${status.toLowerCase()}`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  truncateId(id: string): string {
    return id.substring(0, 8);
  }

  goToDetail(reservation: BookingSummary): void {
    this.router.navigate(['/users/profile/reservations', reservation.id]);
  }

  goBack(): void {
    this.router.navigate(['/']); 
  }

}
