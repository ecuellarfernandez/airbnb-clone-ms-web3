import { Component, Output, EventEmitter, Input } from '@angular/core';

interface DateRange {
  checkIn: Date | null;
  checkOut: Date | null;
}

@Component({
  selector: 'app-date-picker',
  standalone: false,
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent {
  @Input() isOpen: boolean = false;
  @Input() dateRange: DateRange = { checkIn: null, checkOut: null };
  @Input() variant: 'search' | 'booking' = 'search';
  @Output() dateRangeChange = new EventEmitter<DateRange>();
  @Output() close = new EventEmitter<void>();

  activeTab: 'dates' | 'months' | 'flexible' = 'dates';
  currentMonth: Date = new Date();
  nextMonth: Date = new Date();
  selectingCheckIn: boolean = true;

  constructor() {
    this.nextMonth.setMonth(this.currentMonth.getMonth() + 1);
  }

  get currentMonthName(): string {
    return this.currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  }

  get nextMonthName(): string {
    return this.nextMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  }

  getDaysInMonth(date: Date): Date[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add empty slots for days before the first day of the month
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(new Date(0)); // Placeholder
    }

    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }

  get currentMonthDays(): Date[] {
    return this.getDaysInMonth(this.currentMonth);
  }

  get nextMonthDays(): Date[] {
    return this.getDaysInMonth(this.nextMonth);
  }

  onDateClick(date: Date): void {
    if (date.getTime() === 0) return; // Ignore placeholder dates

    if (this.selectingCheckIn || !this.dateRange.checkIn) {
      this.dateRange = { checkIn: date, checkOut: null };
      this.selectingCheckIn = false;
    } else {
      if (date < this.dateRange.checkIn!) {
        this.dateRange = { checkIn: date, checkOut: null };
      } else {
        this.dateRange = { ...this.dateRange, checkOut: date };
        this.selectingCheckIn = true;
        this.dateRangeChange.emit(this.dateRange);
      }
    }
  }

  isSelected(date: Date): boolean {
    if (date.getTime() === 0) return false;
    const checkIn = this.dateRange.checkIn;
    const checkOut = this.dateRange.checkOut;

    if (!checkIn) return false;

    const dateTime = date.getTime();
    const checkInTime = checkIn.getTime();

    if (checkOut) {
      const checkOutTime = checkOut.getTime();
      return dateTime >= checkInTime && dateTime <= checkOutTime;
    }

    return dateTime === checkInTime;
  }

  isInRange(date: Date): boolean {
    if (date.getTime() === 0) return false;
    const checkIn = this.dateRange.checkIn;
    const checkOut = this.dateRange.checkOut;

    if (!checkIn || !checkOut) return false;

    const dateTime = date.getTime();
    return dateTime > checkIn.getTime() && dateTime < checkOut.getTime();
  }

  addExactDays(days: number): void {
    const today = new Date();
    const checkIn = new Date(today);
    const checkOut = new Date(today);
    checkOut.setDate(checkOut.getDate() + days);

    this.dateRange = { checkIn, checkOut };
    this.dateRangeChange.emit(this.dateRange);
  }

  previousMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1);
    this.nextMonth = new Date(this.nextMonth.getFullYear(), this.nextMonth.getMonth() - 1);
  }

  nextMonthNav(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1);
    this.nextMonth = new Date(this.nextMonth.getFullYear(), this.nextMonth.getMonth() + 1);
  }

  onClose(): void {
    this.close.emit();
  }
}