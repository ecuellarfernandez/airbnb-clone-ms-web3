import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationCheckoutPageComponent } from './pages/reservation-checkout/reservation-checkout-page.component';

const routes: Routes = [
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