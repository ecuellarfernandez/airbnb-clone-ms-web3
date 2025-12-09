import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-reservation-success-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './reservation-success-page.component.html',
    styleUrls: ['./reservation-success-page.component.scss'],
})
export class ReservationSuccessPageComponent implements OnInit {
    reservationId: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.reservationId = this.route.snapshot.paramMap.get('id');
    }

    goToMyReservations(): void {
        this.router.navigate(['/users/profile/reservations']);
    }

    goToListing(): void {
        // Si luego quieres traer el listingId, puedes pasarlo por queryParams
        this.router.navigate(['/']);
    }
}
