import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, switchMap, combineLatest } from 'rxjs';
import { Listing } from '@features/listings/domain/models/listing.model';
import { Reservation } from '@features/reservations/domain/models/reservation.model';
import { User, Role } from '@features/users/domain/models/user.model';
import { AdminUsersService } from '../services/admin-user.service';
import { AdminClaimsService } from '../services/admin-claims.service';
import { Claim } from '@app/features/users/domain/models/claim.model';
import { response } from 'express';

@Injectable({ providedIn: 'root' })
export class AdminFacade {
  private _listings = new BehaviorSubject<Listing[]>([]);
  listings$ = this._listings.asObservable();

  private _reservations = new BehaviorSubject<Reservation[]>([]);
  reservations$ = this._reservations.asObservable();

  private _users = new BehaviorSubject<User[]>([]);
  users$ = this._users.asObservable();

  private _claims = new BehaviorSubject<Claim[]>([]);
  claims$ = this._claims.asObservable();

  private rolesCache: Role[] = [];

  constructor(private adminService: AdminUsersService, private claimsService: AdminClaimsService) {
    this.loadInitialData();
  }

  private loadInitialData() {
    forkJoin({
      usersResp: this.adminService.searchUsers('', 0, 100),
      rolesResp: this.adminService.getRoles(),
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
    return users.map((u) => ({
      ...u,
      avatar:
        u.avatar ||
        `https://ui-avatars.com/api/?name=${u.firstName}+${u.lastName}&background=random`,
    }));
  }

  loadClaims(page = 0, size = 10) {
    this.claimsService.getClaims(page, size).subscribe((response) => {
      if (response.success) {
        this._claims.next(response.content);
      }
    });
  }

  deleteClaim(id: number){
    this.claimsService.deleteClaim(id).subscribe((response)=> {
        if (response.success){
            alert(`Claim  eliminado ${id}`)
        }
    })
  }
  toggleRole(user: User, roleName: string) {
    const role = this.rolesCache.find((r) => r.name === roleName.toUpperCase());

    if (!role) {
      console.error(`Rol ${roleName} no encontrado en la BD. Roles disponibles:`, this.rolesCache);
      return;
    }

    const hasRole = user.roles.some((r) => r.id === role.id);
    console.log(`${hasRole ? 'Removiendo' : 'Agregando'} rol ${roleName} al usuario ${user.id}`);

    const request$ = hasRole
      ? this.adminService.removeRoleFromUser(user.id, role.id)
      : this.adminService.addRoleToUser(user.id, role.id);

    request$.pipe(switchMap(() => this.adminService.searchUsers('', 0, 100))).subscribe({
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
      },
    });
  }

  toggleActive(userId: number, roleId: number) {
    const next = this._users.value.map((u) => {
      if (u.id === userId) {
        const updatedRoles = u.roles.map((r) =>
          r.id === roleId ? { ...r, active: !r.active } : r
        );
        return { ...u, roles: updatedRoles };
      }
      return u;
    });
    this._users.next(next);
  }
  setRole(id: number, role: User['roles']) {
    const next = this._users.value.map((u) => (u.id === id ? { ...u, role } : u));
    this._users.next(next);
  }

    create(payload: Partial<Listing>) {
    // TODO: Implement create listing via AdminListingsService
    console.log('Create listing:', payload);
  }

  update(id: number, payload: Partial<Listing>) {
    // TODO: Implement update listing via AdminListingsService
    console.log('Update listing:', id, payload);
  }

  remove(id: number) {
    // TODO: Implement remove listing via AdminListingsService
    console.log('Remove listing:', id);
  }
}
