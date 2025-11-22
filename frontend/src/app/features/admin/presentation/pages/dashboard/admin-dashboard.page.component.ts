import { Component } from '@angular/core';
import { AdminFacade } from '@features/admin/application/admin.facade';
import { Reservation } from '@features/reservations/domain/models/reservation.model';
import { combineLatest, map, Observable } from 'rxjs';
import { Listing } from '@features/listings/domain/models/listing.model';

type DashVM = {
    totalListings: number;
    totalReservations: number;
    paidReservations: number;
    unpaidReservations: number;
    topCities: { city: string; count: number }[];
    revenueEstimated: number;
};

@Component({
    selector: 'app-admin-dashboard-page',
    standalone: false,
    templateUrl: './admin-dashboard.page.component.html',
    styleUrls: ['./admin-dashboard.page.component.scss']
})
export class AdminDashboardPageComponent {
    vm$: Observable<DashVM>;

    constructor(private facade: AdminFacade) {
        this.vm$ = combineLatest([this.facade.listings$, this.facade.reservations$]).pipe(
            map(([L, R]: [Listing[], Reservation[]]) => {
                const totalListings = L.length;
                const totalReservations = R.length;
                const paidReservations = R.filter(r => r.paid).length;
                const unpaidReservations = totalReservations - paidReservations;
                const revenueEstimated = R.filter(r => r.paid).reduce((s, r) => s + r.total, 0);

                const cityCount: Record<string, number> = {};
                L.forEach(l => { cityCount[l.city] = (cityCount[l.city] ?? 0) + 1; });
                const topCities = Object.entries(cityCount)
                    .map(([city, count]) => ({ city, count }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 3);

                return { totalListings, totalReservations, paidReservations, unpaidReservations, revenueEstimated, topCities };
            })
        );
    }
}
