import { Component, Input } from '@angular/core';
import { Listing } from '../../models/listing.model';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.scss'],
})
export class ListingCardComponent {
  @Input({ required: true }) listing!: Listing;
}
