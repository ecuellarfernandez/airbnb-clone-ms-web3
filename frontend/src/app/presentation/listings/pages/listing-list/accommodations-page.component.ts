import { Component, inject, OnInit } from '@angular/core';
import { GetCitiesUseCase } from '@application/listings/use-cases/get-cities.use-case';
import { FilterListingsUseCase } from '@application/listings/use-cases/filter-listings.use-case';
import { Filters } from '@domain/repositories/accommodations.repository';
import { Listing } from '@domain/models/listing.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accommodations-page',
  standalone: false,
  templateUrl: './accommodations-page.component.html',
  styleUrls: ['./accommodations-page.component.scss'],
})
export class AccommodationsPageComponent implements OnInit {
  cities: string[] = [];
  cityInput = 'All';
  maxPriceInput = '';
  minCapacityInput = '';
  results: Listing[] = [];

  constructor(
    private getCitiesUseCase: GetCitiesUseCase,
    private filterListingsUseCase: FilterListingsUseCase,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cities = this.getCitiesUseCase.execute();
    this.apply();
  }

  apply(): void {
    const filters: Filters = {
      city: this.cityInput.trim(),
      maxPrice: this.maxPriceInput,
      minCapacity: this.minCapacityInput,
    };
    this.results = this.filterListingsUseCase.execute(filters);
  }

  clear(): void {
    this.cityInput = 'All';
    this.maxPriceInput = '';
    this.minCapacityInput = '';
    this.apply();
  }

  protected listingRedirect(l: Listing) {
    this.router.navigate(['/listings/detail', l.id]);
  }
}
