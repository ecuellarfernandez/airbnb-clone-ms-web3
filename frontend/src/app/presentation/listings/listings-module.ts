import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingsRoutingModule } from './listings-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccommodationsPageComponent } from '@listings/pages/listing-list/accommodations-page.component';
import { ListingCardComponent } from '@listings/components/listing-card/listing-card.component';
import { ListingDetailPageComponent } from './pages/listing-detail/listing-detail-page.component';
import { SharedModule } from '../shared/shared-module';
import { CardBookDetailComponent } from './components/card-book-detail/card-book-detail.component';

@NgModule({
  declarations: [AccommodationsPageComponent, ListingCardComponent, ListingDetailPageComponent, CardBookDetailComponent],
  imports: [FormsModule, CommonModule, ListingsRoutingModule, SharedModule],
  exports: [
    ListingCardComponent
  ]
})
export class ListingsModule { }