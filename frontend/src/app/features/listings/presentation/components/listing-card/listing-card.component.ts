import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Listing } from '@features/listings/domain/models/listing.model';

@Component({
  selector: 'app-listing-card',
  standalone: false,
  templateUrl: './listing-card.component.html',
})
export class ListingCardComponent implements OnInit {

  @Input({ required: true }) listing!: Listing;
  @Input() showDescription: boolean = false;
  @Output() listingClick = new EventEmitter<MouseEvent>();
  clickableListing = true;

  ngOnInit(): void {
    // Component initialized successfully
  }
}
