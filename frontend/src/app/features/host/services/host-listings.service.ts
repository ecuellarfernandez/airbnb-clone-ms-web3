import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '@app/core/config/api.config';
import { AuthService } from '@features/auth/domain/services/auth.service';

export interface ListingSummary {
  id: string;
  title: string;
  city: string;
  country?: string;
  priceAmount: number;
  priceCurrency: string;
  capacity: number;
  primaryImageUrl?: string;
  active: boolean;
}

export interface PagedResult<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  pageSize: number;
  pageNumber: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface StandardResult<T> {
  success: boolean;
  data: T;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HostListingsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getMyListings(page: number = 0, size: number = 10): Observable<StandardResult<PagedResult<ListingSummary>>> {
    const user = this.authService.getUser();

    if (!user || !user.id) {
      throw new Error('Usuario no autenticado');
    }

    const hostId = user.id;

    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', 'createdAt')
      .set('sortDirection', 'DESC');

    return this.http.get<StandardResult<PagedResult<ListingSummary>>>(
      `${API_ENDPOINTS.LISTINGS.BASE}/listings/host/${hostId}`,
      { params }
    );
  }

  publishListing(listingId: string): Observable<StandardResult<void>> {
    return this.http.patch<StandardResult<void>>(
      `${API_ENDPOINTS.LISTINGS.BASE}/listings/${listingId}/publish`,
      {}
    );
  }

  unpublishListing(listingId: string): Observable<StandardResult<void>> {
    return this.http.patch<StandardResult<void>>(
      `${API_ENDPOINTS.LISTINGS.BASE}/listings/${listingId}/unpublish`,
      {}
    );
  }
  deleteListing(listingId: string): Observable<StandardResult<void>> {
    return this.http.delete<StandardResult<void>>(
      `${API_ENDPOINTS.LISTINGS.BASE}/listings/${listingId}`
    );
  }

  getListingById(listingId: string): Observable<StandardResult<any>> {
    return this.http.get<StandardResult<any>>(
      `${API_ENDPOINTS.LISTINGS.BASE}/listings/${listingId}`
    );
  }
}
