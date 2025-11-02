import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { AdminStore, User } from '../../data-access/services/admin.store';
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

    constructor(private store: AdminStore) {
        this.users$ = this.store.users$; 
    }

    toggle(u: User) { this.store.toggleActive(u.id); }
    promote(u: User) { this.store.setRole(u.id, 'host'); }
    makeAdmin(u: User) { this.store.setRole(u.id, 'admin'); }
    makeGuest(u: User) { this.store.setRole(u.id, 'guest'); }
}
