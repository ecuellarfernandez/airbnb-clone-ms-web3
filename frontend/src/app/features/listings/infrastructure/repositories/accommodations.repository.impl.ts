import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccommodationsRepository, Filters } from '../../domain/repositories/accommodations.repository';
import { Listing } from '../../domain/models/listing.model';
import { CreateListingDto, ListingResponse } from '../../domain/dtos/listing.dto';
import { LISTINGS_MOCK } from '../../presentation/data-access/data/listings.mock';
import { environment } from 'environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AccommodationsRepositoryImpl implements AccommodationsRepository {
  private data: Listing[] = LISTINGS_MOCK;
  private readonly apiUrl = `${environment.apiUrl}/listings`;

  constructor(private http: HttpClient) { }

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

  create(dto: CreateListingDto): Observable<ListingResponse> {
    return this.http.post<ListingResponse>(this.apiUrl, dto);
  }
}
