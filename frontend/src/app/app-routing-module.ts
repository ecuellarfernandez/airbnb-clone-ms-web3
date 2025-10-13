import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: 'accommodations',
    loadChildren: () =>
      import('./features/accommodations/accommodations-module').then((m) => m.AccommodationsModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: '**', redirectTo: 'accommodations' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
