import { Injectable } from '@angular/core';
import { AccommodationsRepository } from '@domain/repositories/accommodations.repository';

@Injectable({ providedIn: 'root' })
export class GetCitiesUseCase {
    constructor(private repository: AccommodationsRepository) { }

    execute(): string[] {
        return this.repository.getCities();
    }
}
