import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '@core/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from '@core/layouts/auth-layout/auth-layout.component';
import { PageNotFoundComponent } from '@core/pages/page-not-found/page-not-found.component';
import { UserProfilePageComponent } from '@features/user-profile/user-profile-page.component';
import { BookingLayoutComponent } from '@core/layouts/booking-layout/booking-layout.component';
import { authGuard } from '@core/guards/auth.guard';
import { adminGuard } from '@core/guards/admin.guard';
import { MyReservationsPageComponent } from './features/reservations/presentation/pages/my-reservations/my-reservations-page.component';
import { ReservationDetailPageComponent } from './features/reservations/presentation/pages/reservation-detail/reservation-detail-page.component';


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
    path: 'users',
    canActivateChild: [authGuard],
    children: [
      {
        path: 'profile',
        component: UserProfilePageComponent,
        children: [
            {
                path: 'reservations',
                component: MyReservationsPageComponent 
            },
            {
                path: 'reservations/:id',
                component: ReservationDetailPageComponent
            }
        ]
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'reservations',
    loadChildren: () => import('@app/features/reservations/presentation/reservations-module').then(m => m.ReservationsModule)
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
    canActivate: [adminGuard],
    loadChildren: () => import('@features/admin/presentation/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'host',
    canActivate: [authGuard],
    loadChildren: () => import('@features/host/presentation/host.module').then(m => m.HostModule)
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
