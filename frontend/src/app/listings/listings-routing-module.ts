import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationsPageComponent } from './features/accommodations-page/accommodations-page.component';

const routes: Routes = [
  {
    path: '',
    component: AccommodationsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingsRoutingModule {}
