import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, switchMap } from 'rxjs';
import { Listing } from '@features/listings/domain/models/listing.model';
import { Reservation } from '@features/reservations/domain/models/reservation.model';
import { User, Role } from '@features/users/domain/models/user.model';
import { AdminUsersService } from '../services/admin-user.service';

@Injectable({ providedIn: 'root' })
export class AdminFacade {
    private _listings = new BehaviorSubject<Listing[]>([]);
    listings$ = this._listings.asObservable();

    private _reservations = new BehaviorSubject<Reservation[]>([]);
    reservations$ = this._reservations.asObservable();

    private _users = new BehaviorSubject<User[]>([]);
    users$ = this._users.asObservable();

    private rolesCache: Role[] = [];

    constructor(private adminService : AdminUsersService) {
        this.loadInitialData();
    }

    private loadInitialData(){
        forkJoin({
            usersResp: this.adminService.getUsers(),
            rolesResp: this.adminService.getRoles()
        }).subscribe(({ usersResp, rolesResp }) => {
            if (usersResp.success) {
                this._users.next(this.mapUsers(usersResp.content));
            }
            if (rolesResp.success) {
                this.rolesCache = rolesResp.content;
            }
        });

    }

    private mapUsers(users: User[]): User[] {
        return users.map(u => ({
            ...u,
            avatar: u.avatar || `https://ui-avatars.com/api/?name=${u.firstName}+${u.lastName}&background=random`
        }));
    }

    toggleRole(user: User, roleName: string) {
        const role = this.rolesCache.find(r => r.name === roleName.toUpperCase());
        
        if (!role) {
            console.error(`Rol ${roleName} no encontrado en la BD. Roles disponibles:`, this.rolesCache);
            return;
        }

        const hasRole = user.roles.some(r => r.id === role.id);
        console.log(`${hasRole ? 'Removiendo' : 'Agregando'} rol ${roleName} al usuario ${user.id}`);
        
        const request$ = hasRole
            ? this.adminService.removeRoleFromUser(user.id, role.id)
            : this.adminService.addRoleToUser(user.id, role.id);

        request$.pipe(
            switchMap(() => this.adminService.getUsers())
        ).subscribe({
            next: (resp) => {
                if (resp.success) {
                    console.log('Usuarios actualizados:', resp.content);
                    this._users.next(this.mapUsers(resp.content));
                } else {
                    console.error('Error en respuesta:', resp);
                }
            },
            error: (err) => {
                console.error('Error al cambiar rol:', err);
            }
        });
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

toggleActive(userId: number, roleId: number) {
    const next = this._users.value.map(u => {
        if (u.id === userId) {
            const updatedRoles = u.roles.map(r => 
                r.id === roleId ? { ...r, active: !r.active } : r
            );
            return { ...u, roles: updatedRoles };
        }
        return u;
    });
    this._users.next(next);
}
    setRole(id: number, role: User['roles']) {
        const next = this._users.value.map(u => (u.id === id ? { ...u, role } : u));
        this._users.next(next);
    }
}
