import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListingsRoutingModule } from './listings-routing-module';
import { SharedModule } from '../../../shared/shared-module';

// Pages
import { ListingFormPageComponent } from './pages/listing-form/listing-form-page.component';
import { AccommodationsPageComponent } from './pages/listing-list/accommodations-page.component';
import { ListingDetailPageComponent } from './pages/listing-detail/listing-detail-page.component';

// Components
import { ListingCardComponent } from './components/listing-card/listing-card.component';
import { CardBookDetailComponent } from './components/card-book-detail/card-book-detail.component';
import { ListingMapComponent } from './components/listing-map-component/listing-map.component';

// Use Cases
import { CreateListingUseCase } from '../application/use-cases/create-listing.use-case';
import { UpdateListingUseCase } from '../application/use-cases/update-listing.use-case';

// Services
import { ListingFormStateService } from '../application/services/listing-form-state.service';

@NgModule({
  declarations: [
    // Pages
    ListingFormPageComponent,
    AccommodationsPageComponent,
    ListingDetailPageComponent,

    // Components
    ListingCardComponent,
    CardBookDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ListingsRoutingModule,
    SharedModule,
    ListingMapComponent // Import standalone component
  ],
  providers: [
    CreateListingUseCase,
    UpdateListingUseCase,
    ListingFormStateService
  ],
  exports: [
    ListingCardComponent, // Export para usar en otros módulos
    ListingFormPageComponent
  ]
})
export class ListingsModule { }
