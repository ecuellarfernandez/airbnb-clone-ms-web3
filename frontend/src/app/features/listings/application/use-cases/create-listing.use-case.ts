import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '@app/core/config/api.config';

export interface CreateListingCommand {
  hostId: string;
  title: string;
  description: string;
  location: {
    city: string;
    country: string;
    address: string;
    latitude?: number | null;
    longitude?: number | null;
  };
  price: {
    amount: number;
    currency: string;
  };
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  categoryIds: string[];
  amenityIds: string[];
  images: Array<{
    url: string;
    publicId: string;
    isPrimary: boolean;
  }>;
}

export interface CreateListingResponse {
  success: boolean;
  data?: any;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreateListingUseCase {

  constructor(private http: HttpClient) {}

  execute(command: CreateListingCommand): Observable<CreateListingResponse> {
    console.log('🆕 Executing CreateListingUseCase with command:', command);

    return this.http.post<CreateListingResponse>(
      `${API_ENDPOINTS.LISTINGS.BASE}/listings`,
      command
    );
  }
}
