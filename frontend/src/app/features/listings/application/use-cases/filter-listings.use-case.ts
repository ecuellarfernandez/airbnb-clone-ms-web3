import { Injectable } from '@angular/core';
import { AccommodationsRepository, Filters } from '@features/listings/domain/repositories/accommodations.repository';
import { Listing } from '@features/listings/domain/models/listing.model';

@Injectable({ providedIn: 'root' })
export class FilterListingsUseCase {
    constructor(private repository: AccommodationsRepository) { }

    execute(filters: Filters): Listing[] {
        return this.repository.filter(filters);
    }
}
