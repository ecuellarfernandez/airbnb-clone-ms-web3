import { Injectable } from '@angular/core';
import { tap, Observable } from 'rxjs';
import { AccommodationsRepository, Filters } from '../../domain/repositories/accommodations.repository';
import { Listing } from '../../domain/models/listing.model';
import { ListingsApiService } from '../../domain/services/listings-api.service';

@Injectable({ providedIn: 'root' })
export class AccommodationsRepositoryImpl implements AccommodationsRepository {
  private data: Listing[] = [];

  constructor(private listingsApi: ListingsApiService) { }

  loadAll(): Observable<Listing[]> {
    return this.listingsApi.getAll().pipe(
      tap((listings) => {
        console.log(
          '[AccommodationsRepository] Listings recibidos desde API:',
          listings
        );
        this.data = listings;
      })
    );
  }

  getCities(): string[] {
    const set = new Set(this.data.map((d) => d.city));
    return ['All', ...Array.from(set)];
  }

  filter(filters: Filters): Listing[] {
    const { city, maxPrice, minCapacity } = filters;

    return this.data.filter((l) => {
      const okCity = city === '' ? true : l.city === city;
      //const okPrice = maxPrice === '' ? true : l.price <= Number(maxPrice);
      //const okCap = minCapacity === '' ? true : l.capacity >= Number(minCapacity);
      return okCity;
    });
  }

  getById(id: string): Listing | undefined {
    return this.data.find((l) => l.id === id);
  }

  getAll(): Listing[] {
    return this.data;
  }
}
