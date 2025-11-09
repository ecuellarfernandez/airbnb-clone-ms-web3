import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface NavLink {
  label: string;
  path: string;
}

export interface FilterState {
  city: string;
  maxPrice: number | null;
  guests: number | null;
}

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() links: NavLink[] = [];
  
  filters: FilterState = {
    city: '',
    maxPrice: null,
    guests: null
  };

  isUserMenuOpen = false;

  constructor() {}

  onSearch(): void {
    console.log('Searching with filters:', this.filters);
  }

  clearFilters(): void {
    this.filters = {
      city: '',
      maxPrice: null,
      guests: null
    };
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  onLocationSearch(searchTerm: string): void {
    console.log('Searching location:', searchTerm);
  }
}
