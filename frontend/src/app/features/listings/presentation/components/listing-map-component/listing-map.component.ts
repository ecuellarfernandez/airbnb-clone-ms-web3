import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
    selector: 'app-listing-map',
    standalone: false,
    templateUrl: './listing-map.component.html',
    styleUrls: ['./listing-map.component.scss']
})
export class ListingMapComponent implements OnChanges {
    @Input() latitude?: number;
    @Input() longitude?: number;
    @Input() city?: string;
    @Input() country?: string;
    @Input() address?: string;

    mapUrl: SafeResourceUrl | null = null;

    constructor(private sanitizer: DomSanitizer) {}

    ngOnChanges(): void {
        if (this.latitude != null && this.longitude != null) {
            const url = `https://www.google.com/maps?q=${this.latitude},${this.longitude}&z=14&output=embed`;
            this.mapUrl  = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
    }

    get fullAddress(): string {
        return [this.address, this.city, this.country].filter(Boolean).join(', ');
    }

}