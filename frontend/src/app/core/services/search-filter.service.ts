import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SearchFilters {
    location: string;
    checkIn: Date | null;
    checkOut: Date | null;
    adults: number;
    children: number;
    infants: number;
    pets: number;
}

const DEFAULT_FILTERS: SearchFilters = {
    location: '',
    checkIn: null,
    checkOut: null,
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0
};

@Injectable({
    providedIn: 'root'
})
export class SearchFilterService {
    private filtersSubject = new BehaviorSubject<SearchFilters>(DEFAULT_FILTERS);
    public filters$: Observable<SearchFilters> = this.filtersSubject.asObservable();

    constructor() { }

    getFilters(): SearchFilters {
        return this.filtersSubject.value;
    }

    updateLocation(location: string): void {
        this.filtersSubject.next({
            ...this.filtersSubject.value,
            location
        });
    }

    updateDates(checkIn: Date | null, checkOut: Date | null): void {
        this.filtersSubject.next({
            ...this.filtersSubject.value,
            checkIn,
            checkOut
        });
    }

    updateGuests(adults: number, children: number, infants: number, pets: number): void {
        this.filtersSubject.next({
            ...this.filtersSubject.value,
            adults,
            children,
            infants,
            pets
        });
    }

    clearFilters(): void {
        this.filtersSubject.next(DEFAULT_FILTERS);
    }

    getTotalGuests(): number {
        const filters = this.filtersSubject.value;
        return filters.adults + filters.children;
    }

    executeSearch(): void {
        const filters = this.filtersSubject.value;
        console.log('Ejecutando búsqueda con filtros:', filters);
        // Aquí se implementaría la lógica de búsqueda real
    }
}
