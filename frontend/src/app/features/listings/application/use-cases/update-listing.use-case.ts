import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '@app/core/config/api.config';

export interface UpdateListingCommand {
  id: string;
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

export interface UpdateListingResponse {
  success: boolean;
  data?: any;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UpdateListingUseCase {

  constructor(private http: HttpClient) {}

  execute(command: UpdateListingCommand): Observable<UpdateListingResponse> {
    console.log('🔄 Executing UpdateListingUseCase with command:', command);

    return this.http.put<UpdateListingResponse>(
      `${API_ENDPOINTS.LISTINGS.BASE}/listings/${command.id}`,
      command
    );
  }
}
