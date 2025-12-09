import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '@app/core/config/api.config';

export interface UpdateListingCommand {
  id: string;
  title: string;
  description: string;
  location: {
    city: string;
    country: string;
    address: string;
    latitude?: number | null;
    longitude?: number | null;
  };
  priceAmount: number;
  priceCurrency: string;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  categoryIds: string[];
  amenityIds: string[];
  images: Array<{
    mediaUrl: string;
    publicId: string;
    isPrimary: boolean;
    displayOrder: number;
  }>;
}

export interface UpdateListingResponse {
  success: boolean;
  data?: any;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UpdateListingUseCase {

  constructor(private http: HttpClient) { }

  execute(command: UpdateListingCommand): Observable<UpdateListingResponse> {
    const url = `${API_ENDPOINTS.LISTINGS.BASE}/listings/${command.id}`;

    console.log('🔄 Executing UpdateListingUseCase');
    console.log('📍 Full URL:', url);
    console.log('🆔 Listing ID:', command.id);
    console.log('📦 Command payload:', JSON.stringify(command, null, 2));

    return this.http.put<UpdateListingResponse>(url, command);
  }
}
