import { Component, OnInit } from '@angular/core';
import { Listing } from '@domain/models/listing.model';
import { FilterListingsUseCase } from '@application/listings/use-cases/filter-listings.use-case';
import { GetAllListingsUseCase } from '@application/listings/use-cases/get-all-listings.use-case';
import { Filters } from '@domain/repositories/accommodations.repository';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  constructor(
    private filterListingsUseCase: FilterListingsUseCase,
    private getAllListingsUseCase: GetAllListingsUseCase,
    private router: Router
  ) { }
  resultsSc: Listing[] = [];

  santaCruzListings: Listing[] = [];
  tarijaListings: Listing[] = [];
  sucreListings: Listing[] = [];
  laPazListings: Listing[] = [];
  cochabambaListings: Listing[] = [];

  ngOnInit() {
    this.groupListingsByCity();
    const filters: Filters = {
      city: "Santa Cruz",
      maxPrice: "",
      minCapacity: "",
    };
    this.resultsSc = this.filterListingsUseCase.execute(filters);
  }

  private groupListingsByCity() {
    const allListings = this.getAllListingsUseCase.execute();
    this.santaCruzListings = allListings.filter(l => l.city === 'Santa Cruz');
    this.tarijaListings = allListings.filter(l => l.city === 'Tarija');
    this.sucreListings = allListings.filter(l => l.city === 'Sucre');
    this.laPazListings = allListings.filter(l => l.city === 'La Paz');
    this.cochabambaListings = allListings.filter(l => l.city === 'Cochabamba');
  }

  protected onListingDetail(listing: Listing) {
    this.router.navigate(['/listings/detail', listing.id]);
  }
}
