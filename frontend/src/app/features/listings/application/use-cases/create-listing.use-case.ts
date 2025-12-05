import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccommodationsRepository } from '../../domain/repositories/accommodations.repository';
import { CreateListingDto, ListingResponse } from '../../domain/dtos/listing.dto';

@Injectable({
    providedIn: 'root'
})
export class CreateListingUseCase {
    constructor(private repository: AccommodationsRepository) { }

    execute(dto: CreateListingDto): Observable<ListingResponse> {
        return this.repository.create(dto);
    }
}
