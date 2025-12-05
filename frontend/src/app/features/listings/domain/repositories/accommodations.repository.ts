import { Observable } from 'rxjs';
import { Listing } from '../models/listing.model';
import { CreateListingDto, ListingResponse } from '../dtos/listing.dto';

export interface Filters {
  city: string;
  maxPrice: string | number;
  minCapacity: string | number;
}

export abstract class AccommodationsRepository {
  abstract getCities(): string[];
  abstract filter(filters: Filters): Listing[];
  abstract getById(id: number): Listing | undefined;
  abstract getAll(): Listing[];
  abstract create(dto: CreateListingDto): Observable<ListingResponse>;
}
