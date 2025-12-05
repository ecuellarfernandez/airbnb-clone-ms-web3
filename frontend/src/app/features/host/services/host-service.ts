import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '@app/core/config/api.config';
import { User } from '@app/features/users/domain/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class HostService {

    private bookingsURL : string = API_ENDPOINTS.LISTINGS.RESERVATION;
    private usersURL : string = API_ENDPOINTS.IDENTITY.USERS;

    constructor(private http: HttpClient) {
    }

    getHostBookings(){

    }

    makeMeHost(token: string){
        let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<User>(this.usersURL + "/make-me-host", {}, { headers });
    }

    getListingById(listingId: string){
        return this.http.get(`${API_ENDPOINTS.LISTINGS.BASE}/${listingId}`);
    }
    

}
