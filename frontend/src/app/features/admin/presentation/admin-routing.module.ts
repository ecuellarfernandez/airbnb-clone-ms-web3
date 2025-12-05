import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/layout/admin-layout.component';
import { AdminDashboardPageComponent } from './pages/dashboard/admin-dashboard.page.component';
import { AdminListingsPageComponent } from './pages/listings/admin-listings.page.component';
import { AdminReservationsPageComponent } from './pages/reservations/admin-reservations.page.component';
import { AdminClaimsPageComponent } from './pages/claims/admin-claims.page.component';
import { AdminUsersPageComponent } from './pages/users/admin-users.page.component';
import { AdminRolesPageComponent } from './pages/roles/admin-roles.page.component';
import { AuditLogsPageComponent } from './pages/audit-log/admin-auditlog.page';
import { AdminViewListingsPageComponent } from './pages/view-listings/admin-view-listings.page.component';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            { path: '', redirectTo: 'listings', pathMatch: 'full' },
            { path: 'claims', component: AdminClaimsPageComponent },
            { path: 'users', component: AdminUsersPageComponent },
            { path: 'roles', component: AdminRolesPageComponent },
            { path: 'audit-logs', component: AuditLogsPageComponent},
            { path: 'listing', component: AdminListingsPageComponent},
            { path: 'listing/view', component: AdminViewListingsPageComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
