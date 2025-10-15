import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingsRoutingModule } from './listings-routing-module';
import { FormsModule } from '@angular/forms';
import { AccommodationsPageComponent } from './features/accommodations-page/accommodations-page.component';
import { ListingCardComponent } from './ui/listing-card/listing-card.component';

@NgModule({
  declarations: [AccommodationsPageComponent, ListingCardComponent],
  imports: [FormsModule, CommonModule, ListingsRoutingModule],
})
export class ListingsModule {}
