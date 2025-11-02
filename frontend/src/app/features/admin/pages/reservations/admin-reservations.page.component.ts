import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminStore, Reservation } from '../../data-access/services/admin.store';
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
    constructor(private store: AdminStore) {
        this.reservationsVM$ = combineLatest([
            this.store.reservations$,
            this.qChanges.pipe(startWith(this.q))
        ]).pipe(
            map(([list, term]) => {
                const t = (term ?? '').trim().toLowerCase();
                const items = t ? list.filter(r =>
                    r.user.name.toLowerCase().includes(t) || r.listingTitle.toLowerCase().includes(t)
                ) : list;
                const total = items.length, paid = items.filter(i => i.paid).length, unpaid = total - paid;
                return { items, total, paid, unpaid };
            })
        );
    }
    onSearchChange(v: string) { this.q = v; this.qChanges.next(v); }
}
