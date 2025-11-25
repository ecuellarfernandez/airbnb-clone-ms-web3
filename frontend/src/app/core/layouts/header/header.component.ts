import { Component, Input, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { NavTab } from '../../../shared/ui/nav-tabs/nav-tabs.component';

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
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() variant: 'default' | 'simple' = 'default';

  isUserMenuOpen = false;
  activeTabId: string = 'accommodations';
  showNavTabs = true;
  private routerSubscription: Subscription | null = null;

  navTabs: NavTab[] = [
    {
      id: 'accommodations',
      label: 'Alojamientos',
      icon: 'home'
    },
    {
      id: 'experiences',
      label: 'Experiencias',
      icon: 'experience',
      isNew: true
    },
    {
      id: 'services',
      label: 'Servicios',
      icon: 'service',
      isNew: true
    }
  ];

  isScrolled = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.checkRoute();
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkRoute();
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private checkRoute() {
    // Hide nav tabs if we are on a listing detail page
    // Pattern: /listings/detail/:id
    this.showNavTabs = !this.router.url.includes('/listings/detail/');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  onTabChange(tabId: string): void {
    this.activeTabId = tabId;
    console.log('Tab changed to:', tabId);
  }
}
