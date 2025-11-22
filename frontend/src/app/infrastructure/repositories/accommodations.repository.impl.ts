import { Injectable } from '@angular/core';
import { LISTINGS_MOCK } from '../../presentation/listings/data-access/data/listings.mock';
import { Listing } from '../../domain/models/listing.model';
import { AccommodationsRepository, Filters } from '../../domain/repositories/accommodations.repository';

@Injectable({ providedIn: 'root' })
export class AccommodationsRepositoryImpl implements AccommodationsRepository {
  private data: Listing[] = LISTINGS_MOCK;

  getCities(): string[] {
    const set = new Set(this.data.map((d) => d.city));
    return ['All', ...Array.from(set)];
  }

  filter(filters: Filters): Listing[] {
    const { city, maxPrice, minCapacity } = filters;

    return this.data.filter((l) => {
      const okCity = city === 'All' ? true : l.city === city;
      const okPrice = maxPrice === '' ? true : l.price <= Number(maxPrice);
      const okCap = minCapacity === '' ? true : l.capacity >= Number(minCapacity);
      return okCity && okPrice && okCap;
    });
  }

  getById(id: number): Listing | undefined {
    return this.data.find((l) => l.id === id);
  }

  getAll(): Listing[] {
    return this.data;
  }
}
