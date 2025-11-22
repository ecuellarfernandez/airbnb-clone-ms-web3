import { Injectable } from '@angular/core';
import { AccommodationsRepository } from '@domain/repositories/accommodations.repository';
import { Listing } from '@domain/models/listing.model';

@Injectable({ providedIn: 'root' })
export class GetAllListingsUseCase {
    constructor(private repository: AccommodationsRepository) { }

    execute(): Listing[] {
        return this.repository.getAll();
    }
}
