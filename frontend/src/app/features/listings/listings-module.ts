import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingsRoutingModule } from './listings-routing-module';
import { FormsModule } from '@angular/forms';
import { AccommodationsPageComponent } from '@listings/pages/listing-list/accommodations-page.component';
import { ListingCardComponent } from '@listings/components/listing-card/listing-card.component';

@NgModule({
  declarations: [AccommodationsPageComponent, ListingCardComponent],
  imports: [FormsModule, CommonModule, ListingsRoutingModule],
})
export class ListingsModule {}
