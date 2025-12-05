import { Component, inject, OnInit } from '@angular/core';
import { AccommodationsRepository, Filters } from '@features/listings/domain/repositories/accommodations.repository';
import { Listing } from '@features/listings/domain/models/listing.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accommodations-page',
  standalone: false,
  templateUrl: './accommodations-page.component.html',
  styleUrls: ['./accommodations-page.component.scss'],
})
export class AccommodationsPageComponent implements OnInit {
  listings: Listing[] = [];
  cities: string[] = [];
  loading = false;

  filters: Filters = {
    city: ''
  }

  constructor(
    private router: Router,
    private repo: AccommodationsRepository
  ) { }

  ngOnInit(): void {
    this.loading = true;

    this.repo.loadAll().subscribe({
      next: () => {
        this.cities = this.repo.getCities();
        this.applyFilters();
        this.loading = false
      },
      error: (error) => {
        console.error('Error cargando listings desde el microservicio', error);
      },
    });
  }

  applyFilters(): void {
    this.listings = this.repo.filter(this.filters);
  }

  clear(): void {
    this.filters = {
      city: ''
    }

    this.applyFilters();
  }

  protected listingRedirect(l: Listing) {
    this.router.navigate(['/listings/detail', l.id]);
  }
}
