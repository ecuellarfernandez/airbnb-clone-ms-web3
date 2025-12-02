import { Component, OnInit } from '@angular/core';
import { User } from '../../../../users/domain/models/user.model';
import { AdminUsersService } from '@features/admin/services/admin-user.service';

@Component({
    selector: 'app-admin-layout',
    standalone: false,
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

}