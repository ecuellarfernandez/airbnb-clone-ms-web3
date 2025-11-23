import { Injectable } from '@angular/core';
import { AccommodationsRepository } from '@features/listings/domain/repositories/accommodations.repository';
import { Listing } from '@features/listings/domain/models/listing.model';

@Injectable({ providedIn: 'root' })
export class GetListingByIdUseCase {
    constructor(private repository: AccommodationsRepository) { }

    execute(id: number): Listing | undefined {
        return this.repository.getById(id);
    }
}
