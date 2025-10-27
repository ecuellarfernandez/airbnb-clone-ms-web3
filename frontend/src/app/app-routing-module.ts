import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppShellComponent } from './core/layout/app-shell/app-shell.component';

const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home-module').then(m => m.HomeModule),
      }
        ],
  },
  {
    path: 'listings',
    component: AppShellComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@listings/listings-module').then(m => m.ListingsModule),
      },
      { path: '', pathMatch: 'full', redirectTo: 'listings' }
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth-module').then(m=>m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
