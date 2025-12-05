import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '@app/core/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class HostService {

    private bookingsURL : string = API_ENDPOINTS.LISTINGS.BOOKINGS;

    constructor(private http: HttpClient) {
    }

    getHostBookings(){
        
    }
    

}
