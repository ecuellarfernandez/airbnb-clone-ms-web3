import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingFormPageComponent } from './pages/listing-form/listing-form-page.component';
import { AccommodationsPageComponent } from './pages/listing-list/accommodations-page.component';
import { ListingDetailPageComponent } from './pages/listing-detail/listing-detail-page.component';

const routes: Routes = [
  {
    path: '',
    component: AccommodationsPageComponent
  },
  {
    path: 'create',
    component: ListingFormPageComponent
  },
  {
    path: 'form',
    component: ListingFormPageComponent
  },
  {
    path: 'detail/:id',
    component: ListingDetailPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingsRoutingModule { }
