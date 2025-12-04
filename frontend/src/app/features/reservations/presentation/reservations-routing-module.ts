import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationCheckoutPageComponent } from './pages/reservation-checkout/reservation-checkout-page.component';
import { MyReservationsPageComponent } from './pages/my-reservations/my-reservations-page.component';

const routes: Routes = [
    {
        path: '',
        component: MyReservationsPageComponent,
    },
    {
        path: 'checkout',
        component: ReservationCheckoutPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReservationsRoutingModule { }