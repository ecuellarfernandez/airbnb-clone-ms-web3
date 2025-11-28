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

  isDetailPage = false;

  searchIsExpanded = false;

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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkRoute();
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkRoute();
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  onWindowScroll(): void {
    if (!this.isDetailPage) return;

    if (window.scrollY > 20 && this.searchIsExpanded) {
      this.searchIsExpanded = false;
      this.showNavTabs = false;
    }
  }

  private checkRoute(): void {
    this.isDetailPage = this.router.url.includes('/listings/detail/');

    if (this.isDetailPage) {
      this.searchIsExpanded = false;
      this.showNavTabs = false;
    } else {
      this.searchIsExpanded = true;
      this.showNavTabs = true;
    }
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  onTabChange(tabId: string): void {
    this.activeTabId = tabId;
    console.log('Tab changed to:', tabId);
  }

  onExpandedChange(expanded: boolean) {
    this.searchIsExpanded = expanded;

    if (this.isDetailPage) {
      this.showNavTabs = expanded;
    }
  }
}
