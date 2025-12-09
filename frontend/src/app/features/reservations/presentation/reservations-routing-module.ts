import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationCheckoutPageComponent } from './pages/reservation-checkout/reservation-checkout-page.component';
import { MyReservationsPageComponent } from './pages/my-reservations/my-reservations-page.component';
import { ReservationDetailPageComponent } from './pages/reservation-detail/reservation-detail-page.component';
import { ReservationSuccessPageComponent } from './pages/reservation-success-page/reservation-success-page.component';

const routes: Routes = [
    {
        path: '',
        component: MyReservationsPageComponent,
    },
    {
        path: 'checkout',
        component: ReservationCheckoutPageComponent,
    },
    {
        path: 'success/:id',
        component: ReservationSuccessPageComponent,
    },
    {
        path: ':id',
        component: ReservationDetailPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReservationsRoutingModule { }