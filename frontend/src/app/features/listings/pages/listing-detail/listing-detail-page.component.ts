import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationsService } from '@listings/data-access/services/accommodations.api';
import { Listing } from '@listings/data-access/models/listing.model';


@Component({
    selector: 'app-listing-detail-page',
    standalone: false,
    templateUrl: './listing-detail-page.component.html',
    styleUrls: ['./listing-detail-page.component.scss']
})
export class ListingDetailPageComponent implements OnInit {
    loading = true;
    listing?: Listing;

    allPhotos: String[] = [];
    visibleThumbs = 3;
    showLigthbox = false;
    currentPhotoIndex = 0;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private accommodationsService: AccommodationsService
    ) { }

    ngOnInit(): void {
        const idParam = this.route.snapshot.paramMap.get('id');
        const id = Number(idParam);

        if (!id || Number.isNaN(id)) {
            this.back();
            return;
        }

        const result = this.accommodationsService.getById(id);
        if (!result) {
            this.back();
            return;
        }

        this.listing = result;

        const extras = this.listing.photos ?? [];
        this.allPhotos = [this.listing.image, ...extras];

        this.loading = false;
    }

    get totalPhotos(): number {
        return this.allPhotos.length;
    }

    get showCount(): number {
        return 1 + Math.min(this.visibleThumbs, (this.listing?.photos?.length ?? 0));
    }

    get remainingCount(): number {
        return Math.max(0, this.totalPhotos - this.showCount);
    }


    back(): void {
        this.router.navigate(['/listings']);
    }

    bookDemo(): void {
        alert('Reservation successful');
    }

    openLightbox(index = 0): void {
        this.currentPhotoIndex = index;
        this.showLigthbox = true;
    }
    closeLightbox(ev?: Event): void {
        ev?.stopPropagation();
        this.showLigthbox = false;
    }
    prev(ev?: Event): void {
        ev?.stopPropagation();
        this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.totalPhotos) % this.totalPhotos;
    }
    next(ev?: Event): void {
        ev?.stopPropagation();
        this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.totalPhotos;
    }

    @HostListener('document:keydown.arrowleft') onLeft() { 
        if (this.showLigthbox) this.prev(); 
    }
    @HostListener('document:keydown.arrowright') onRight() { 
        if (this.showLigthbox) this.next(); 
    }
    @HostListener('document:keydown.escape') onEsc() { 
        if (this.showLigthbox) this.showLigthbox = false; 
    }
}
