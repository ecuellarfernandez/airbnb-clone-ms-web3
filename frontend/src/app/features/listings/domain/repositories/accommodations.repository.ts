import { Listing } from '../models/listing.model';

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
}
