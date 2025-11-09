import {Component, inject, OnInit} from '@angular/core';
import { AccommodationsService, Filters } from '@listings/data-access/services/accommodations.api';
import { Listing } from '@listings/data-access/models/listing.model';
import {Router} from '@angular/router';

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

  constructor(private svc: AccommodationsService,
              private router:Router) {}

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

  protected listingRedirect(l: Listing) {
    this.router.navigate(['/listings/detail', l.id]);
  }
}
