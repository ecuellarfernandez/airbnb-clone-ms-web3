import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminFacade } from '@features/admin/application/admin.facade';
import { Reservation } from '@features/reservations/domain/models/reservation.model';
import { BehaviorSubject, Observable, combineLatest, map, startWith } from 'rxjs';

type VM = { items: Reservation[]; total: number; paid: number; unpaid: number; };

@Component({
    selector: 'app-admin-reservations-page',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-reservations.page.component.html',
    styleUrls: ['./admin-reservations.page.component.scss']
})
export class AdminReservationsPageComponent {
    q = '';
    private qChanges = new BehaviorSubject<string>('');
    reservationsVM$!: Observable<VM>;
    constructor(private facade: AdminFacade) {
        this.reservationsVM$ = combineLatest([
            this.facade.reservations$,
            this.qChanges.pipe(startWith(this.q))
        ]).pipe(
            map(([list, term]: [Reservation[], string]) => {
                const t = (term ?? '').trim().toLowerCase();
                const items = t ? list.filter((r: Reservation) =>
                    r.user.name.toLowerCase().includes(t) || r.listingTitle.toLowerCase().includes(t)
                ) : list;
                const total = items.length, paid = items.filter((i: Reservation) => i.paid).length, unpaid = total - paid;
                return { items, total, paid, unpaid };
            })
        );
    }
    onSearchChange(v: string) { this.q = v; this.qChanges.next(v); }
}
