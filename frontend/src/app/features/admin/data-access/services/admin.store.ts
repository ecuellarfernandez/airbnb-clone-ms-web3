import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Listing } from '@listings/data-access/models/listing.model';

export interface Reservation {
    id: number;
    user: { id: number; name: string; avatar: string };
    listingId: number;
    listingTitle: string;
    checkIn: string;
    checkOut: string;
    paid: boolean;
    total: number;
    status?: 'active' | 'cancelled';
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'guest' | 'host' | 'admin';
    active: boolean;
    avatar: string;
}

@Injectable({ providedIn: 'root' })
export class AdminStore {
    private _listings = new BehaviorSubject<Listing[]>([]);
    listings$ = this._listings.asObservable();

    private _reservations = new BehaviorSubject<Reservation[]>([]);
    reservations$ = this._reservations.asObservable();

    private _users = new BehaviorSubject<User[]>([]);
    users$ = this._users.asObservable();

    constructor() {
        import('@listings/data-access/data/listings.mock').then((mod) => {
            this._listings.next(mod.LISTINGS_MOCK);
        });

        this._users.next([
            { id: 1, name: 'Andrea Rojas', email: 'andrea@demo.com', role: 'admin', active: true, avatar: 'https://i.pravatar.cc/64?img=5' },
            { id: 2, name: 'Ulises Gomez', email: 'ulises@demo.com', role: 'host', active: true, avatar: 'https://i.pravatar.cc/64?img=11' },
            { id: 3, name: 'Carla Pérez', email: 'carla@demo.com', role: 'guest', active: true, avatar: 'https://i.pravatar.cc/64?img=15' },
            { id: 4, name: 'David Rossi', email: 'david@demo.com', role: 'guest', active: false, avatar: 'https://i.pravatar.cc/64?img=23' },
        ]);

        const R: Reservation[] = [
            { id: 1, user: { id: 3, name: 'Carla Pérez', avatar: 'https://i.pravatar.cc/64?img=14' }, listingId: 1, listingTitle: 'Modern apt in Equipetrol', checkIn: '2025-12-01', checkOut: '2025-12-05', paid: false, total: 400, status: 'active' },
            { id: 2, user: { id: 2, name: 'Ulises Gomez', avatar: 'https://i.pravatar.cc/64?img=13' }, listingId: 5, listingTitle: 'Minimalist loft', checkIn: '2025-11-10', checkOut: '2025-11-13', paid: true, total: 330, status: 'active' },
            { id: 3, user: { id: 1, name: 'Andrea Rojas', avatar: 'https://i.pravatar.cc/64?img=5' }, listingId: 2, listingTitle: 'Eco House', checkIn: '2025-10-21', checkOut: '2025-10-23', paid: true, total: 180, status: 'cancelled' },
            { id: 4, user: { id: 4, name: 'David Rossi', avatar: 'https://i.pravatar.cc/64?img=23' }, listingId: 3, listingTitle: 'Casa moderna', checkIn: '2025-12-15', checkOut: '2025-12-20', paid: false, total: 700, status: 'active' },
            { id: 5, user: { id: 3, name: 'Carla Pérez', avatar: 'https://i.pravatar.cc/64?img=14' }, listingId: 6, listingTitle: 'Loft urbano', checkIn: '2025-12-04', checkOut: '2025-12-06', paid: true, total: 220, status: 'active' },
            { id: 6, user: { id: 2, name: 'Ulises Gomez', avatar: 'https://i.pravatar.cc/64?img=13' }, listingId: 7, listingTitle: 'Lake View', checkIn: '2026-01-11', checkOut: '2026-01-14', paid: false, total: 420, status: 'active' },
            { id: 7, user: { id: 4, name: 'David Rossi', avatar: 'https://i.pravatar.cc/64?img=23' }, listingId: 4, listingTitle: 'Cabaña rústica', checkIn: '2025-09-10', checkOut: '2025-09-12', paid: true, total: 160, status: 'active' },
            { id: 8, user: { id: 3, name: 'Carla Pérez', avatar: 'https://i.pravatar.cc/64?img=14' }, listingId: 8, listingTitle: 'Depto céntrico', checkIn: '2025-11-22', checkOut: '2025-11-25', paid: false, total: 300, status: 'active' },
            { id: 9, user: { id: 1, name: 'Andrea Rojas', avatar: 'https://i.pravatar.cc/64?img=5' }, listingId: 9, listingTitle: 'Studio minimal', checkIn: '2025-07-01', checkOut: '2025-07-03', paid: true, total: 120, status: 'active' },
            { id: 10, user: { id: 2, name: 'Ulises Gomez', avatar: 'https://i.pravatar.cc/64?img=13' }, listingId: 1, listingTitle: 'Modern apt in Equipetrol', checkIn: '2025-08-10', checkOut: '2025-08-12', paid: true, total: 200, status: 'active' },
        ];
        this._reservations.next(R);
    }

    create(listing: Partial<Listing>) {
        const now = this._listings.value.slice();
        const id = Math.max(0, ...now.map(l => l.id)) + 1;
        now.unshift({
            id,
            title: listing.title ?? '',
            city: listing.city ?? 'Santa Cruz',
            price: listing.price ?? 0,
            capacity: listing.capacity ?? 1,
            image: listing.image ?? '',
            description: listing.description ?? '',
            photos: listing.photos ?? []
        });
        this._listings.next(now);
    }
    update(id: number, patch: Partial<Listing>) {
        const next = this._listings.value.map(l => (l.id === id ? { ...l, ...patch } : l));
        this._listings.next(next);
    }
    remove(id: number) {
        const next = this._listings.value.filter(l => l.id !== id);
        this._listings.next(next);
    }

    markPaid(id: number) {
        const next = this._reservations.value.map(r => (r.id === id ? { ...r, paid: true } : r));
        this._reservations.next(next);
    }
    cancelReservation(id: number) {
        const next: Reservation[] = this._reservations.value.map(r =>
            r.id === id ? { ...r, status: 'cancelled' } : r
        );
        this._reservations.next(next);
    }


    toggleActive(id: number) {
        const next = this._users.value.map(u => (u.id === id ? { ...u, active: !u.active } : u));
        this._users.next(next);
    }
    setRole(id: number, role: User['role']) {
        const next = this._users.value.map(u => (u.id === id ? { ...u, role } : u));
        this._users.next(next);
    }
}
