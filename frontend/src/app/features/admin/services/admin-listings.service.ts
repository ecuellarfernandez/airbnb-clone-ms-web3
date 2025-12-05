import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '@core/config/api.config';
import { Listing } from '@features/listings/domain/models/listing.model';

export interface AdminListingsPagedData {
  content: Listing[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  message: string;
}

export interface AdminListingsResponse {
  success: boolean;
  message: string;
  data: AdminListingsPagedData;
  errorCode: string | null;
}

@Injectable({ providedIn: 'root' })
export class AdminListingsService {
  private adminListingsUrl = API_ENDPOINTS.LISTINGS.ADMIN;
  private listingsBaseUrl = `${API_ENDPOINTS.LISTINGS.ADMIN.replace('/admin', '')}`;

  constructor(private http: HttpClient) {}

  // GET /api/listings-service/listings/admin
  getAdminListings(page: number = 0, size: number = 10): Observable<AdminListingsResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<AdminListingsResponse>(this.adminListingsUrl, { params });
  }

  // PATCH /api/listings-service/listings/{id}/publish
  publishListing(id: string): Observable<void> {
    return this.http.patch<void>(`${this.listingsBaseUrl}/${id}/publish`, {});
  }

  // PATCH /api/listings-service/listings/{id}/unpublish
  unpublishListing(id: string): Observable<void> {
    return this.http.patch<void>(`${this.listingsBaseUrl}/${id}/unpublish`, {});
  }

  // DELETE /api/listings-service/listings/{id}
  deleteListing(id: string): Observable<void> {
    return this.http.delete<void>(`${this.listingsBaseUrl}/${id}`);
  }
}
