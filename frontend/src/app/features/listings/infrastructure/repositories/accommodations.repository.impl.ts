import { Injectable } from '@angular/core';
import { tap, Observable } from 'rxjs';
import { AccommodationsRepository, Filters } from '../../domain/repositories/accommodations.repository';
import { Listing } from '../../domain/models/listing.model';
import { ListingsApiService } from '../../domain/services/listings-api.service';
import { CreateListingDto, ListingResponse } from '../../domain/dtos/listing.dto';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '@app/core/config/api.config';
import {environment} from '../../../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AccommodationsRepositoryImpl implements AccommodationsRepository {
  private data: Listing[] = [];
  private apiUrl: string = `${environment.apiUrl}/listings`;

  constructor(private listingsApi: ListingsApiService, private http : HttpClient) { }

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
    return Array.from(set);
  }

  filter(filters: Filters): Listing[] {
    const { city, minCapacity } = filters;

    return this.data.filter((l) => {
      const okCity = !city || l.city.toLowerCase() === city.toLowerCase();
      //const okPrice = maxPrice === '' ? true : l.price <= Number(maxPrice);
      const okCap = !minCapacity || l.capacity >= minCapacity;
      return okCity && okCap;
    });
  }

  getById(id: string): Listing | undefined {
    return this.data.find((l) => l.id === id);
  }

  getAll(): Listing[] {
    return this.data;
  }

    create(dto: CreateListingDto): Observable<ListingResponse> {
    return this.http.post<ListingResponse>(this.apiUrl, dto);
  }

  activaListing(id: string): Observable<void>{
    return this.http.patch<void>(
      `${this.apiUrl}/listings/${id}/publish`,
      {}
    );
  }

  desactivateListing(id: string): Observable<void>{
    return this.http.patch<void>(
      `${this.apiUrl}/listings/${id}/unpublish`,
      {}
    );
  }
}
