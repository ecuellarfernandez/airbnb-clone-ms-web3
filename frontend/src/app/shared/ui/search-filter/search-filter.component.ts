import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { SearchFilterService, SearchFilters } from '../../../core/services/search-filter.service';
import { Subscription } from 'rxjs';
import { GuestCounts } from '../guest-selector/guest-selector.component';

@Component({
  selector: 'app-search-filter',
  standalone: false,
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss'
})
export class SearchFilterComponent implements OnInit, OnDestroy, OnChanges {
  //@Input() startExpanded: boolean = true;
  @Input() compact: boolean = false;     
  @Output() expandedChange = new EventEmitter<boolean>();

  isExpanded: boolean = true;

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
    this.isExpanded = !this.compact;
    this.expandedChange.emit(this.isExpanded);

    this.subscription = this.searchFilterService.filters$.subscribe(
      filters => this.filters = filters
    );
  }

  // Para que al cambiar de ruta (home/detalle) se actualice el estado
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['compact'] && !changes['compact'].firstChange) {
      this.compact = changes['compact'].currentValue;
      this.isExpanded = !this.compact;
    }

    if (!this.isExpanded) {
        this.closeModals();
    }

    this.expandedChange.emit(this.isExpanded);
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

  get hasActiveFilter(): boolean {
    const totalGuests = this.searchFilterService.getTotalGuests();
    return !!(
      this.filters.location ||
      this.filters.checkIn ||
      this.filters.checkOut ||
      totalGuests
    );
  }

  collapse(): void {
    this.isExpanded = false;
    this.expandedChange.emit(false);
    this.closeModals();
  }

  toggleExpanded(): void {
    if (this.isExpanded){
      this.collapse();
    } else {
      this.isExpanded = true;
      this.expandedChange.emit(true);
    }
  }

  expandAndOpen(section: 'location' | 'dates' | 'guests'): void {
    this.isExpanded = true;
    this.expandedChange.emit(true);

    this.isLocationModalOpen = section === 'location';
    this.isDateModalOpen = section === 'dates';
    this.isGuestModalOpen = section === 'guests';
  }

  openLocationModal(): void {
    this.isLocationModalOpen = true;
    this.isDateModalOpen = false;
    this.isGuestModalOpen = false;
  }

  openDateModal(): void {
    this.isDateModalOpen = true;
    this.isLocationModalOpen = false;
    this.isGuestModalOpen = false;
  }

  openGuestModal(): void {
    this.isGuestModalOpen = true;
    this.isLocationModalOpen = false;
    this.isDateModalOpen = false;
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
    this.collapse();
  }

  closeModals(): void {
    this.isLocationModalOpen = false;
    this.isDateModalOpen = false;
    this.isGuestModalOpen = false;
  }
}
