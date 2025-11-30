import { Component, HostListener, OnInit } from "@angular/core";
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GetListingByIdUseCase } from '@features/listings/application/use-cases/get-listing-by-id.use-case';
import { Listing } from '@features/listings/domain/models/listing.model';

interface BookPayload {
    dateRange: { checkIn: Date | null; checkOut: Date | null };
    guests: { adults: number; children: number; infants: number; pets: number };
}

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
        private location: Location,
        private getListingByIdUseCase: GetListingByIdUseCase
    ) { }


    ngOnInit(): void {
        const idParam = this.route.snapshot.paramMap.get('id');
        const id = Number(idParam);

        if (!id || Number.isNaN(id)) {
            this.back();
            return;
        }

        const result = this.getListingByIdUseCase.execute(id);
        if (!result) {
            this.back();
            return;
        }

        this.listing = result;

        const extras = this.listing?.photos ?? [];
        this.allPhotos = [this.listing?.image ?? '', ...extras];

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
        this.location.back();
    }

    bookDemo(payload: BookPayload): void {
        if (!this.listing) return;

        const { dateRange, guests } = payload;

        this.router.navigate(['/reservations/checkout'], {
            queryParams: {
                listingId: this.listing.id,
                checkIn: dateRange.checkIn?.toISOString() ?? null,
                checkOut: dateRange.checkOut?.toISOString() ?? null,
                adults: guests.adults,
                children: guests.children,
                infants: guests.infants,
                pets: guests.pets,
            },
        });
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