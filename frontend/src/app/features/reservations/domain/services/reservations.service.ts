import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '@core/config/api.config';
import { BookingSummary } from '../models/reservation.model';

interface StandardResult<T> {
  success: boolean;
  message: string;
  data: T;
  errorCode: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private readonly API_URL = API_ENDPOINTS.LISTINGS.BOOKINGS;

  constructor(private http: HttpClient) {}

  getMyReservations(): Observable<StandardResult<BookingSummary[]>> {
    return this.http.get<StandardResult<BookingSummary[]>>(`${this.API_URL}/me`);
  }
}
