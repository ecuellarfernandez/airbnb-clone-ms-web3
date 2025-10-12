import { Injectable } from '@angular/core';
import { LISTINGS_MOCK } from '../data/listings.mock';
import { Listing } from '../models/listing.model';

export interface Filters {
    city: string;        
    maxPrice: string;    
    minCapacity: string; 
}

@Injectable({ providedIn: 'root' })
export class AccommodationsService {
    private data: Listing[] = LISTINGS_MOCK;

    getCities(): string[] {
        const set = new Set(this.data.map(d => d.city));
        return ['All', ...Array.from(set)];
    }

    filter(filters: Filters): Listing[] {
        const { city, maxPrice, minCapacity } = filters;

        return this.data.filter(l => {
            const okCity = city === 'All' ? true : l.city === city;
            const okPrice = maxPrice === '' ? true : l.price <= Number(maxPrice);
            const okCap = minCapacity === '' ? true : l.capacity >= Number(minCapacity);
            return okCity && okPrice && okCap;
        });
    }
}
