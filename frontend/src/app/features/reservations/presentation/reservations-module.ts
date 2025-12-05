import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationSuccessPageComponent } from './pages/reservation-success-page/reservation-success-page.component';
import { ReservationsRoutingModule } from './reservations-routing-module';
import { ReservationCheckoutPageComponent } from './pages/reservation-checkout/reservation-checkout-page.component';
import { MyReservationsPageComponent } from './pages/my-reservations/my-reservations-page.component';
import { SharedModule } from '../../../shared/shared-module';

@NgModule({
  declarations: [ReservationCheckoutPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ReservationsRoutingModule,
    MyReservationsPageComponent, // Standalone component
    ReservationSuccessPageComponent,
  ]
})
export class ReservationsModule {}