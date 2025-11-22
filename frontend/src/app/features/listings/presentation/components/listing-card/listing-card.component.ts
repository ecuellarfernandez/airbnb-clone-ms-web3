import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Listing } from '@features/listings/domain/models/listing.model';

@Component({
  selector: 'app-listing-card',
  standalone: false,
  templateUrl: './listing-card.component.html',
})
export class ListingCardComponent {
  @Input({ required: true }) listing!: Listing;
  @Input() showDescription: boolean = false;
  @Output() listingClick = new EventEmitter<MouseEvent>();
  clickableListing = true;
}
