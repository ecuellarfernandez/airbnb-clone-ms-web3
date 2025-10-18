import { Component } from '@angular/core';
import { NavLink } from '@ui/header/header.component';

@Component({
  selector: 'app-app-shell',
  standalone: false,
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss'
})
export class AppShellComponent {
  links: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'Accommodations', path: '/accommodations' },
  ];
}
