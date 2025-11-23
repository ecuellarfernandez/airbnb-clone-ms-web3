import { Injectable } from '@angular/core';
import { AccommodationsRepository } from '@features/listings/domain/repositories/accommodations.repository';
import { Listing } from '@features/listings/domain/models/listing.model';

@Injectable({ providedIn: 'root' })
export class GetAllListingsUseCase {
    constructor(private repository: AccommodationsRepository) { }

    execute(): Listing[] {
        return this.repository.getAll();
    }
}
