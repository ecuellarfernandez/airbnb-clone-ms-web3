import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppShellComponent } from './core/layout/app-shell/app-shell.component';

const routes: Routes = [
  {
    path: 'listings',
    component: AppShellComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./listings/listings-module').then(m => m.ListingsModule),
      },
      { path: '', pathMatch: 'full', redirectTo: 'listings' }
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./user-management/user-management-module').then(m=>m.UserManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
