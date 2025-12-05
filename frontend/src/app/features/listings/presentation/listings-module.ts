import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingsRoutingModule } from './listings-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListingDetailPageComponent } from './pages/listing-detail/listing-detail-page.component';
import { CardBookDetailComponent } from './components/card-book-detail/card-book-detail.component';
import { AccommodationsPageComponent } from './pages/listing-list/accommodations-page.component';
import { ListingCardComponent } from './components/listing-card/listing-card.component';
import { ListingFormPageComponent } from './pages/listing-form/listing-form-page.component';
import { SharedModule } from '../../../shared/shared-module';
import { ListingMapComponent } from '../presentation/components/listing-map-component/listing-map.component';


@NgModule({
  declarations: [
    AccommodationsPageComponent,
    ListingCardComponent,
    ListingDetailPageComponent,
    CardBookDetailComponent,
    ListingFormPageComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ListingsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ListingMapComponent],
  exports: [
    ListingCardComponent
  ]
})
export class ListingsModule { }
