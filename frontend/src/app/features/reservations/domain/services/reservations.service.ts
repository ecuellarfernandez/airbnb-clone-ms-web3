import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '@core/config/api.config';
import { BookingSummary, BookingDetail } from '../models/reservation.model';

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
  private readonly RESERVATION_URL = API_ENDPOINTS.LISTINGS.RESERVATION;

  constructor(private http: HttpClient) {}

  getMyReservations(): Observable<StandardResult<BookingSummary[]>> {
    return this.http.get<StandardResult<BookingSummary[]>>(`${this.API_URL}/me`);
  }

  getBookingById(id: string): Observable<StandardResult<BookingDetail>> {
    return this.http.get<StandardResult<BookingDetail>>(`${this.RESERVATION_URL}/${id}`);
  }
}
