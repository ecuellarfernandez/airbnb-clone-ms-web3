import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFacade } from '@features/admin/application/admin.facade';
import { User } from '@features/users/domain/models/user.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-admin-users-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './admin-users.page.component.html',
    styleUrls: ['./admin-users.page.component.scss']
})
export class AdminUsersPageComponent {
    users$!: Observable<User[]>;

    constructor(private facade: AdminFacade) {
        this.users$ = this.facade.users$;
    }

    toggle(u: User) { this.facade.toggleActive(u.id); }
    promote(u: User) { this.facade.setRole(u.id, 'host'); }
    makeAdmin(u: User) { this.facade.setRole(u.id, 'admin'); }
    makeGuest(u: User) { this.facade.setRole(u.id, 'guest'); }
}
