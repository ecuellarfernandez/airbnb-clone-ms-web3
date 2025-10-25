import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccommodationsService, Filters } from '@listings/data-access/services/accommodations.api';
import { ListingCardComponent } from '@listings/components/listing-card/listing-card.component';
import { Listing } from '@listings/data-access/models/listing.model';

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

  constructor(private svc: AccommodationsService) {}

  ngOnInit(): void {
    this.cities = this.svc.getCities();
    this.apply();
  }

  apply(): void {
    const filters: Filters = {
      city: this.cityInput.trim(),
      maxPrice: this.maxPriceInput,
      minCapacity: this.minCapacityInput,
    };
    this.results = this.svc.filter(filters);
  }

  clear(): void {
    this.cityInput = 'All';
    this.maxPriceInput = '';
    this.minCapacityInput = '';
    this.apply();
  }
}
