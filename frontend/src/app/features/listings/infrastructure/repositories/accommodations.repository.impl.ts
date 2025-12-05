import { Injectable } from '@angular/core';
import { AccommodationsRepository, Filters } from '../../domain/repositories/accommodations.repository';
import { LISTINGS_MOCK } from '../../presentation/data-access/data/listings.mock';
import { Listing } from '../../domain/models/listing.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccommodationsRepositoryImpl implements AccommodationsRepository {
  private data: Listing[] = LISTINGS_MOCK;
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient){}

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

  getById(id: string | number): Listing | undefined {
    return this.data.find((l) => String(l.id) === String(id));
  }

  getAll(): Listing[] {
    return this.data;
  }

  activaListing(id: string): Observable<void>{
    return this.http.patch<void>(
      `${this.apiUrl}/listings/${id}/publish`,
      {}
    )
  }

  desactivateListing(id: string): Observable<void>{
    return this.http.patch<void>(
      `${this.apiUrl}/listings/${id}/unpublish`,
      {}
    )
  }
}
