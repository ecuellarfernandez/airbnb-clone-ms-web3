import { Component } from '@angular/core';
import { NavLink } from '@ui/header/header.component';

@Component({
    selector: 'app-auth-layout',
    standalone: false,
    templateUrl: './auth-layout.component.html',
    styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {
    links: NavLink[] = [];
}
