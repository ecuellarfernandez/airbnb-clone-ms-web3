import { Component, EventEmitter, Input, Output } from "@angular/core";

interface DateRange {
  checkIn: Date | null;
  checkOut: Date | null;
}

interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

@Component({
  selector: 'app-card-book-detail',
  standalone: false,
  templateUrl: './card-book-detail.component.html',
  styleUrls: ['./card-book-detail.component.scss'] 
})

export class CardBookDetailComponent {
  @Input() price!: number | string;
  @Input() capacity!: number | string;
  @Input() currency: string = 'BOB'; 
  @Input() defaultNights: number = 1;  
  @Input() variant: 'search' | 'booking' = 'search'; 

  @Output() book = new EventEmitter<{
    dateRange: DateRange;
    guests: GuestCounts;
  }>();

  isDatePickerOpen: boolean = false;
  isGuestSelectorOpen: boolean = false;

  dateRange: DateRange = {
    checkIn: null,
    checkOut: null
  };

  guests: GuestCounts = {
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0
  };

  // Getters

  get totalGuests(): number {
    return (
      this.guests.adults +
      this.guests.children +
      this.guests.infants +
      this.guests.pets
    )
  }

  get nights(): number | null {
    const { checkIn, checkOut } = this.dateRange;
    if (!checkIn || !checkOut) return null

    const diffMs = checkOut.getTime() - checkIn.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : null;
  }

  private get numericPrice(): number | null {
    const p = Number(this.price);
    return Number.isNaN(p) ? null : p;
  }

  get totalPrice(): number | null {
    if (!this.nights || !this.numericPrice) return null;
    return this.nights * this.numericPrice;
  }

  // Labels

  get priceLabel(): string {
    return typeof this.price === 'number' ? this.price.toString() : this.price;
  }

  get nightsLabel(): string {
    const n = this.nights ?? this.defaultNights;
    if (!n || n === 1) return '1 noche';
    return `${n} noches`;
  }

  get guestLabel(): string {
    const { adults, children, infants, pets } = this.guests;

    const mainGuests = adults + children;
    const parts: string[] = [];

    if (mainGuests > 0) {
      if (mainGuests === 1) {
        parts.push('1 huésped');
      } else {
        parts.push(`${mainGuests} huéspedes`);
      }
    }

    if (infants > 0) {
      if (infants === 1) {
        parts.push('1 bebé');
      } else {
        parts.push(`${infants} bebés`);
      }
    }

    if (pets > 0) {
      if (pets === 1) {
        parts.push('1 mascota');
      } else {
        parts.push(`${pets} mascotas`);
      }
    }

    if (parts.length === 0) {
      return '1 huésped';
    }

    return parts.join(', ');
  }
  // UI

  openDatePicker(): void {
    this.isDatePickerOpen = true;
    this.isGuestSelectorOpen = false;
  }

  closeDatePicker(): void {
    this.isDatePickerOpen = false;
  }

  onDateRangeChange(range: DateRange): void {
    this.dateRange = range;
  }

  openGuestSelector(): void {
    this.isGuestSelectorOpen = true;
    this.isDatePickerOpen = false;
  }

  closeGuestSelector(): void {
    this.isGuestSelectorOpen = false;
  }

  onGuestChange(guests: GuestCounts): void {
    this.guests = guests;
  }

  onBookClick(e: MouseEvent): void {
    this.book.emit({
      dateRange: this.dateRange,
      guests: this.guests,
    })
  }
}
