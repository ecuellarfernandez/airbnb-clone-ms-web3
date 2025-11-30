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

    toggleRole(user: User, roleName: string) {
        this.facade.toggleRole(user, roleName);
    }

    hasRole(user: User, roleName: string): boolean {
        return user.roles?.some(r => r.name === roleName.toUpperCase());
    }
}
