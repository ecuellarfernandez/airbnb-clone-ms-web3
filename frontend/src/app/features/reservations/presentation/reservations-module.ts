import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ReservationsRoutingModule } from './reservations-routing-module';
import { ReservationCheckoutPageComponent } from './pages/reservation-checkout/reservation-checkout-page.component';
import { SharedModule } from '../../../shared/shared-module';

@NgModule({
  declarations: [ReservationCheckoutPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ReservationsRoutingModule,
  ]
})
export class ReservationsModule {}
