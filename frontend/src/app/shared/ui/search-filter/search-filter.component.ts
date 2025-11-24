import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchFilterService, SearchFilters } from '../../../core/services/search-filter.service';
import { Subscription } from 'rxjs';
import { GuestCounts } from '../guest-selector/guest-selector.component';

@Component({
  selector: 'app-search-filter',
  standalone: false,
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss'
})
export class SearchFilterComponent implements OnInit, OnDestroy {
  isExpanded: boolean = false;
  isLocationModalOpen: boolean = false;
  isDateModalOpen: boolean = false;
  isGuestModalOpen: boolean = false;

  filters: SearchFilters = {
    location: '',
    checkIn: null,
    checkOut: null,
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0
  };

  private subscription?: Subscription;

  constructor(private searchFilterService: SearchFilterService) { }

  ngOnInit(): void {
    this.subscription = this.searchFilterService.filters$.subscribe(
      filters => this.filters = filters
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  get locationText(): string {
    return this.filters.location || 'Anywhere';
  }

  get dateText(): string {
    if (this.filters.checkIn && this.filters.checkOut) {
      const checkIn = this.filters.checkIn.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
      const checkOut = this.filters.checkOut.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
      return `${checkIn} - ${checkOut}`;
    }
    return 'Any week';
  }

  get guestText(): string {
    const total = this.searchFilterService.getTotalGuests();
    if (total === 0) return 'Add guests';
    if (total === 1) return '1 huésped';
    return `${total} huéspedes`;
  }

  get dateRange() {
    return {
      checkIn: this.filters.checkIn,
      checkOut: this.filters.checkOut
    };
  }

  get guestCounts(): GuestCounts {
    return {
      adults: this.filters.adults,
      children: this.filters.children,
      infants: this.filters.infants,
      pets: this.filters.pets
    };
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  openLocationModal(): void {
    this.isLocationModalOpen = true;
  }

  openDateModal(): void {
    this.isDateModalOpen = true;
  }

  openGuestModal(): void {
    this.isGuestModalOpen = true;
  }

  onLocationSelect(location: string): void {
    this.searchFilterService.updateLocation(location);
    this.isLocationModalOpen = false;
  }

  onDateRangeChange(dateRange: { checkIn: Date | null; checkOut: Date | null }): void {
    this.searchFilterService.updateDates(dateRange.checkIn, dateRange.checkOut);
  }

  onGuestsChange(guests: GuestCounts): void {
    this.searchFilterService.updateGuests(
      guests.adults,
      guests.children,
      guests.infants,
      guests.pets
    );
  }

  onSearch(): void {
    this.searchFilterService.executeSearch();
    this.isExpanded = false;
  }

  closeModals(): void {
    this.isLocationModalOpen = false;
    this.isDateModalOpen = false;
    this.isGuestModalOpen = false;
  }
}
