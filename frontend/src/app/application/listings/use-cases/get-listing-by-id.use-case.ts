import { Injectable } from '@angular/core';
import { AccommodationsRepository } from '@domain/repositories/accommodations.repository';
import { Listing } from '@domain/models/listing.model';

@Injectable({ providedIn: 'root' })
export class GetListingByIdUseCase {
    constructor(private repository: AccommodationsRepository) { }

    execute(id: number): Listing | undefined {
        return this.repository.getById(id);
    }
}
