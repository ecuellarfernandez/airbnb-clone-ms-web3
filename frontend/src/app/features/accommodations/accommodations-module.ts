import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccommodationsRoutingModule } from './accommodations-routing-module';
import { AccommodationsPageComponent } from './pages/accommodations-page.component';
import { ListingCardComponent } from './components/listing-card/listing-card.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AccommodationsRoutingModule,
        AccommodationsPageComponent,
        ListingCardComponent
    ],
    exports: []
})
export class AccommodationsModule { }