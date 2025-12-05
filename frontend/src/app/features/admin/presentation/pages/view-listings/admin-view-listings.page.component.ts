import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ListingsApiService } from '@features/listings/domain/services/listings-api.service';
import { Listing } from '@features/listings/domain/models/listing.model';
import { ListingsModule } from '@features/listings/presentation/listings-module';

@Component({
  selector: 'app-admin-view-listings',
  standalone: true,
  imports: [CommonModule, ListingsModule],
  templateUrl: './admin-view-listings.page.component.html',
  styleUrls: ['./admin-view-listings.page.component.scss']
})
export class AdminViewListingsPageComponent implements OnInit {
  listings: Listing[] = [];
  loading = false;
  error: string | null = null;
  currentPage = 0;
  pageSize = 20;
  totalPages = 0;
  totalElements = 0;

  constructor(
    private listingsApiService: ListingsApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadListings();
  }

  loadListings(): void {
    this.loading = true;
    this.error = null;
    
    this.listingsApiService.getAll().subscribe({
      next: (listings: Listing[]) => {
        this.listings = listings;
        this.totalElements = listings.length;
        this.totalPages = 1;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar los listings';
        this.loading = false;
        console.error('Error loading listings:', err);
      }
    });
  }

  onListingClick(listing: Listing): void {
    this.router.navigate(['/listings', listing.id]);
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadListings();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadListings();
    }
  }
}
