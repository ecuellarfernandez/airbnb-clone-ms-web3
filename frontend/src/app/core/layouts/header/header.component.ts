import { Component, Input, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { NavTab } from '../../../shared/ui/nav-tabs/nav-tabs.component';
import { ThemeService, Theme } from '@app/core/services/theme.service';
import { AuthService } from '@features/auth/domain/services/auth.service';
import { Listing } from '@features/listings/domain/models/listing.model';

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
  showListingForm = false;
  editingListing: Listing | null = null;

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

  currentTheme: Theme = 'light';
  isAuthenticated = false;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.checkRoute();
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkRoute();
    });

    this.currentTheme = this.themeService.theme;
    this.checkAuthentication();
  }

  private checkAuthentication(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private checkRoute() {
    this.showNavTabs = !this.router.url.includes('/listings/detail/');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    if (this.isUserMenuOpen) {
      this.checkAuthentication();
    }
  }

  onTabChange(tabId: string): void {
    this.activeTabId = tabId;
    console.log('Tab changed to:', tabId);
  }

  onToggleTheme(): void {
    this.themeService.toggleTheme();
    this.currentTheme = this.themeService.theme;
  }

  openListingForm(): void {
    this.router.navigate(['/listings/form']);
  }

  login(): void {
    this.isUserMenuOpen = false;
    this.router.navigate(['/auth/login']);
  }

  logout(): void {
    this.authService.logout();
    this.isUserMenuOpen = false;
    this.router.navigate(['/auth/login']);
  }
}
