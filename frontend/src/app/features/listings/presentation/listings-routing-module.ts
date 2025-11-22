import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationsPageComponent } from './pages/listing-list/accommodations-page.component';
import { ListingDetailPageComponent } from './pages/listing-detail/listing-detail-page.component';
import { ListingFormPageComponent } from './pages/listing-form/listing-form-page.component'; // Importar el componente standalone

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    component: AccommodationsPageComponent,
  },
  {
    path: 'form',
    component: ListingFormPageComponent,
  },
  {
    path: 'detail/:id',
    component: ListingDetailPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingsRoutingModule { }