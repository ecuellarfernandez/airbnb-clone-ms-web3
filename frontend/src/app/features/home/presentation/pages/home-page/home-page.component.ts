import { SearchFilterService, SearchFilters } from './../../../../../core/services/search-filter.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Listing } from '@features/listings/domain/models/listing.model';
import { FilterListingsUseCase } from '@features/listings/application/use-cases/filter-listings.use-case';
import { AccommodationsRepository, Filters } from '@features/listings/domain/repositories/accommodations.repository';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit, OnDestroy {

  results: Listing[] = [];
  loading = false;

  private searchSub?: Subscription;

  constructor(
    private filterListingsUseCase: FilterListingsUseCase,
    private repo: AccommodationsRepository,
    private router: Router,
    private SearchFilterService: SearchFilterService
  ) { }

  ngOnInit(): void {
    this.loading = true;

    this.repo.loadAll().subscribe({
      next: () => {
        this.loading = false;


        const initialFilters = this.SearchFilterService.getFilters();
        this.applyFiltersFromSearch(initialFilters);

        this.searchSub = this.SearchFilterService.search$.subscribe(
          (searchFilters) => {
            this.applyFiltersFromSearch(searchFilters);
          }
        );
      },
      error: (error) => {
        this.loading = false;
        console.error('Error cargando listings en HomePage', error);
      },
    });
  }

  ngOnDestroy(): void {
      this.searchSub?.unsubscribe();
  }

  private applyFiltersFromSearch(search: SearchFilters): void {
    const city = search.location ? search.location.split(',')[0].trim() : '';

    const totalGuests = search.adults + search.children;

    const filters: Filters = {
      city
    };

    if (totalGuests > 0) {
      (filters as any).minCapacity = totalGuests;
    }

    console.log('[HomePage] Filtros barra de búsqueda:', search);
    console.log('[HomePage] Filtros para el repositorio:', filters);

    this.results = this.filterListingsUseCase.execute(filters);
    console.log('[HomePage] results:', this.results);

  }

  protected onListingDetail(listing: Listing) {
    this.router.navigate(['/listings/detail', listing.id]);
  }
}
