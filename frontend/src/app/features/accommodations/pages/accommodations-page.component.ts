import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccommodationsService, Filters } from '../services/accommodations.service';
import { Listing } from '../models/listing.model';
import { ListingCardComponent } from '../components/listing-card/listing-card.component';

@Component({
    selector: 'app-accommodations-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ListingCardComponent
    ],
    templateUrl: './accommodations-page.component.html',
    styleUrls: ['./accommodations-page.component.scss']
})
export class AccommodationsPageComponent implements OnInit {
    cities: string[] = [];
    cityInput = 'All';
    maxPriceInput = '';
    minCapacityInput = '';
    results: Listing[] = [];

    constructor(private svc: AccommodationsService) { }

    ngOnInit(): void {
        this.cities = this.svc.getCities();
        this.apply();
    }

    apply(): void {
        const filters: Filters = {
            city: this.cityInput,
            maxPrice: this.maxPriceInput.trim(),
            minCapacity: this.minCapacityInput.trim()
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