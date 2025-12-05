import { Component, OnInit } from '@angular/core';
import { HostListingsService, ListingSummary } from '@features/host/services/host-listings.service';
import { AuthService } from '@features/auth/domain/services/auth.service';

@Component({
  selector: 'app-host-main-page',
  standalone: false,
  templateUrl: './host-main-page.component.html',
  styleUrl: './host-main-page.component.scss',
})
export class HostMainPageComponent implements OnInit {
  listings: ListingSummary[] = [];
  loading = false;
  error: string | null = null;
  currentPage = 0;
  totalPages = 0;
  totalElements = 0;

  constructor(
    private hostListingsService: HostListingsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadListings();
  }

  loadListings(): void {
    this.loading = true;
    this.error = null;

    this.hostListingsService.getMyListings(this.currentPage, 10).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.listings = response.data.content;
          this.totalPages = response.data.totalPages;
          this.totalElements = response.data.totalElements;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los listings';
        this.loading = false;
        console.error('Error loading listings:', err);
      }
    });
  }

  toggleStatus(listing: ListingSummary): void {
    const action = listing.active 
      ? this.hostListingsService.unpublishListing(listing.id)
      : this.hostListingsService.publishListing(listing.id);

    action.subscribe({
      next: () => {
        listing.active = !listing.active;
      },
      error: (err) => {
        console.error('Error toggling status:', err);
        alert('Error al cambiar el estado del listing');
      }
    });
  }

  getStatusText(active: boolean): string {
    return active ? 'Activo' : 'Inactivo';
  }

  getStatusClass(active: boolean): string {
    return active ? 'status-active' : 'status-inactive';
  }
}
