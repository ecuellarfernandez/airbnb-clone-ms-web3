import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './presentation/layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './presentation/layout/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./presentation/home/home-module').then(m => m.HomeModule),
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
        loadChildren: () => import('./presentation/listings/listings-module').then(m => m.ListingsModule),
      }
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./presentation/auth/auth-module').then(m => m.AuthModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
