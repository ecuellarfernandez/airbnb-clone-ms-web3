import { Component, OnInit } from '@angular/core';
import { LISTINGS_MOCK } from '../../../listings/data-access/data/listings.mock';
import { Listing } from '../../../listings/data-access/models/listing.model';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  santaCruzListings: Listing[] = [];
  tarijaListings: Listing[] = [];
  sucreListings: Listing[] = [];
  laPazListings: Listing[] = [];
  cochabambaListings: Listing[] = [];

  ngOnInit() {
    this.groupListingsByCity();
  }

  private groupListingsByCity() {
    this.santaCruzListings = LISTINGS_MOCK.filter(l => l.city === 'Santa Cruz');
    this.tarijaListings = LISTINGS_MOCK.filter(l => l.city === 'Tarija');
    this.sucreListings = LISTINGS_MOCK.filter(l => l.city === 'Sucre');
    this.laPazListings = LISTINGS_MOCK.filter(l => l.city === 'La Paz');
    this.cochabambaListings = LISTINGS_MOCK.filter(l => l.city === 'Cochabamba');
  }
}
