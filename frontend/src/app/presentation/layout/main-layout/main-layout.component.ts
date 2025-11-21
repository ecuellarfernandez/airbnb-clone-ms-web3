import { Component } from '@angular/core';
import { NavLink } from '@ui/header/header.component';

@Component({
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  links: NavLink[] = [
    { label: 'Alojamientos', path: '/listings' },
  ];
}
