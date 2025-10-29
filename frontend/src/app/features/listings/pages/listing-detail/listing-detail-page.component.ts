import { Component, OnInit } from "@angular/core";
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

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private accommodationsService: AccommodationsService
    ) {}

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
        this.loading = false;
    }

    back(): void {
        this.router.navigate(['/listings']);
    }

    bookDemo(): void {
        alert('Reservation successful');
    }
}
