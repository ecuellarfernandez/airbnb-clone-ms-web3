import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingsRoutingModule } from './listings-routing-module';
import { FormsModule } from '@angular/forms';
import { AccommodationsPageComponent } from '@listings/pages/listing-list/accommodations-page.component';
import { ListingCardComponent } from '@listings/components/listing-card/listing-card.component';
import { ListingDetailPageComponent } from './pages/listing-detail/listing-detail-page.component';
import {SharedModule} from '@app/shared/shared-module';
import { ListingsCoreComponent } from './core/listings-core/listings-core.component';
@NgModule({
  declarations: [AccommodationsPageComponent, ListingCardComponent, ListingDetailPageComponent, ListingsCoreComponent],
  imports: [FormsModule, CommonModule, ListingsRoutingModule, SharedModule],
})
export class ListingsModule {}
