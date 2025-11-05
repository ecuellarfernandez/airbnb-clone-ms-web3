import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Listing } from '@listings/data-access/models/listing.model';

@Component({
  selector: 'app-listing-card',
  standalone: false,
  templateUrl: './listing-card.component.html',
})
export class ListingCardComponent {
  @Input({ required: true }) listing!: Listing;
  @Output() listingClick = new EventEmitter<MouseEvent>();
  clickableListing = true;
}
