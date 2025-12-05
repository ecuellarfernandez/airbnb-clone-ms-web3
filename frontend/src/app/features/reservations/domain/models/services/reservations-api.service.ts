
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '@core/config/api.config';
import { Reservation } from '../reservation.model';
import { StandardResult } from '@app/core/model/api-response.model';

export interface CreateReservationPayload {
    listingId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
}

export interface PaymentReservationPayload {
    reservation_id: string;
    amount: number;
    user_id: number;
    card: {
        number: string;
        expiry: string;
        cvv: string;
    };
}

@Injectable({ providedIn: 'root' })
export class ReservationsApiService {
    constructor(private http: HttpClient) { }

    createReservation(payload: CreateReservationPayload): Observable<any> {
        return this.http.post<any>(
            API_ENDPOINTS.LISTINGS.RESERVATION,
            payload
        );
    }

    payReservation(payload: PaymentReservationPayload): Observable<any> {
        return this.http.post<any>(
            API_ENDPOINTS.PAYMENTS.PAYMENT_RESERVATION,
            payload
        );
    }

    getByListingId(listingId: string): Observable<any> {
        return this.http.get<Reservation>(
            `${API_ENDPOINTS.LISTINGS.RESERVATION}/listing/${listingId}`
        );
    }
}
    