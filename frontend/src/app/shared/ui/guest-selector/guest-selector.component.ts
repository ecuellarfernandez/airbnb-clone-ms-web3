import { Component, Output, EventEmitter, Input } from '@angular/core';

export interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

@Component({
  selector: 'app-guest-selector',
  standalone: false,
  templateUrl: './guest-selector.component.html',
  styleUrl: './guest-selector.component.scss'
})
export class GuestSelectorComponent {
  @Input() isOpen: boolean = false;
  @Input() guests: GuestCounts = {
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0
  };
  @Output() guestsChange = new EventEmitter<GuestCounts>();
  @Output() close = new EventEmitter<void>();

  increment(type: keyof GuestCounts): void {
    this.guests = {
      ...this.guests,
      [type]: this.guests[type] + 1
    };
    this.guestsChange.emit(this.guests);
  }

  decrement(type: keyof GuestCounts): void {
    if (this.guests[type] > 0) {
      this.guests = {
        ...this.guests,
        [type]: this.guests[type] - 1
      };
      this.guestsChange.emit(this.guests);
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
