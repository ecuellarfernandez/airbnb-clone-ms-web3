import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '@core/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from '@core/layouts/auth-layout/auth-layout.component';
import { PageNotFoundComponent } from '@core/pages/page-not-found/page-not-found.component';
import { BookingLayoutComponent } from '@core/layouts/booking-layout/booking-layout.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@features/home/presentation/home-module').then(m => m.HomeModule),
      },
      {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: 'listings',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@features/listings/presentation/listings-module').then(m => m.ListingsModule),
      }
    ],
  },
  {
    path: 'reservations',
    component: BookingLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@app/features/reservations/presentation/reservations-module').then(m => m.ReservationsModule),
      }
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@features/auth/presentation/auth-module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('@features/admin/presentation/admin.module').then(m => m.AdminModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
