import { Component, OnInit } from '@angular/core';
import { Listing } from '@features/listings/domain/models/listing.model';
import { FilterListingsUseCase } from '@features/listings/application/use-cases/filter-listings.use-case';
import { AccommodationsRepository, Filters } from '@features/listings/domain/repositories/accommodations.repository';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  results: Listing[] = [];
  loading = false;

  constructor(
    private filterListingsUseCase: FilterListingsUseCase,
    private repo: AccommodationsRepository,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;

    this.repo.loadAll().subscribe({
      next: () => {
        this.loading = false;

        const filters: Filters = {
          city: ''
        };

        this.results = this.filterListingsUseCase.execute(filters);
        console.log('[HomePage] results:', this.results);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error cargando listings en HomePage', error);
      },
    });
  }

  protected onListingDetail(listing: Listing) {
    this.router.navigate(['/listings/detail', listing.id]);
  }
}
