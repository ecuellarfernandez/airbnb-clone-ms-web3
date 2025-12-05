import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '@core/config/api.config';
import { Listing } from '../models/listing.model';
import { map, tap } from 'rxjs/operators';
import { ListingFullDto } from '../dtos/listing_full.dto';
import { Location } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ListingsApiService {
    constructor(private http: HttpClient) { }

    private mapApiListing = (api: any): Listing => {
        const primaryFromImages = Array.isArray(api.images)
            ? (api.images.find((img: any) => img.isPrimary)?.mediaUrl ??
                api.images[0]?.mediaUrl)
            : undefined;

        const photosFromImages = Array.isArray(api.images)
            ? api.images.map((img: any) => img.mediaUrl)
            : undefined;

        return {
            id: api.id,
            title: api.title,
            city: api.city ?? api.location?.city ?? '',
            country: api.country ?? api.location?.country ?? '',

            address: api.address ?? api.location?.address ?? '',
            latitude: api.latitude ?? api.location?.latitude,
            longitude: api.longitude ?? api.location?.longitude,

            description: api.description ?? '',
            price:
                api.price ??
                api.priceAmount ??
                api.price?.amount ??
                0,
            capacity: api.capacity ?? 0,
            image: api.image ?? api.primaryImageUrl ?? primaryFromImages ?? '',
            primaryImageUrl: api.primaryImageUrl ?? primaryFromImages,
            photos: api.photos ?? photosFromImages,
        };
    };

    getAll(): Observable<Listing[]> {
        const url = `${API_ENDPOINTS.LISTINGS.BASE}/listings`;
        const params = { page: 0, size: 20 };

        return this.http.get<any>(url, { params }).pipe(
            tap((resp) => {
                console.log('[ListingsApiService] Request URL:', url, params);
                console.log('[ListingsApiService] Raw response:', resp);
            }),
            map((resp) => {
                const paged = resp.data ?? resp;
                const content = paged.content ?? [];
                return content.map((item: any) => this.mapApiListing(item));
            })
        );
    }

    getById(id: string): Observable<Listing> {
        const url = `${API_ENDPOINTS.LISTINGS.BASE}/listings/${id}`;

        return this.http.get<any>(url).pipe(
            tap((resp) => {
                console.log('[ListingsApiService] Detail URL:', url);
                console.log('[ListingsApiService] Detail raw response:', resp);
            }),
            map((resp) => {
                const raw = resp.data ?? resp;
                return this.mapApiListing(raw);
            })
        );
    }

    getByIdFull(id: string): Observable<ListingFullDto> {
        const url = `${API_ENDPOINTS.LISTINGS.BASE}/listings/${id}`;

        return this.http.get<any>(url).pipe(
            tap((resp) => {
                console.log('[ListingsApiService] Detail URL:', url);
                console.log('[ListingsApiService] Detail raw response:', resp);
            }),
            map((resp) => {
                const raw = resp.data ?? resp;
                return raw;
            })
        );
    }
}