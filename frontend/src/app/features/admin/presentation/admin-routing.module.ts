import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/layout/admin-layout.component';
import { AdminDashboardPageComponent } from './pages/dashboard/admin-dashboard.page.component';
import { AdminListingsPageComponent } from './pages/listings/admin-listings.page.component';
import { AdminReservationsPageComponent } from './pages/reservations/admin-reservations.page.component';
import { AdminClaimsPageComponent } from './pages/claims/admin-claims.page.component';
import { AdminUsersPageComponent } from './pages/users/admin-users.page.component';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            { path: '', redirectTo: 'listings', pathMatch: 'full' },
            // { path: 'dashboard', component: AdminDashboardPageComponent },
            // { path: 'listings', component: AdminListingsPageComponent },
            // { path: 'reservations', component: AdminReservationsPageComponent },
            { path: 'claims', component: AdminClaimsPageComponent },
            { path: 'users', component: AdminUsersPageComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
