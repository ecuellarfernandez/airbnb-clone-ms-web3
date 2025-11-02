import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing-module';
import { AdminLayoutComponent } from './components/layout/admin-layout.component';
import { AdminDashboardPageComponent } from './pages/dashboard/admin-dashboard.page.component';


@NgModule({
    declarations: [
        AdminLayoutComponent,
        AdminDashboardPageComponent,
    ],
    imports: [
        CommonModule,       
        FormsModule,         
        ReactiveFormsModule,
        AdminRoutingModule
    ]
})
export class AdminModule { }
