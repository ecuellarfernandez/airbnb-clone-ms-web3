import { Observable } from 'rxjs';
import { Listing } from '../models/listing.model';
import { CreateListingDto, ListingResponse } from '../dtos/listing.dto';

export interface Filters {
  city: string;
  maxPrice?:  number;
  minCapacity?:  number;
}

export abstract class AccommodationsRepository {
  abstract loadAll(): Observable<Listing[]>
  abstract getCities(): string[];
  abstract filter(filters: Filters): Listing[];
  abstract getById(id: string): Listing | undefined;
  abstract getAll(): Listing[];
  abstract create(dto: CreateListingDto): Observable<ListingResponse>;
}
