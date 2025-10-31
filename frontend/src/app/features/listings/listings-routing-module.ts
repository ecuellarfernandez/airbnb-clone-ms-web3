import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationsPageComponent } from '@listings/pages/listing-list/accommodations-page.component';
import { ListingDetailPageComponent } from '@app/features/listings/pages/listing-detail/listing-detail-page.component';
import { ListingFormPageComponent } from './pages/listing-form/listing-form-page.component'; // Importar el componente standalone

const routes: Routes = [
  {
    path: ':id',
    component: ListingDetailPageComponent,
  },
  {
    path: '',
    component: AccommodationsPageComponent,
  },
  {
    path: 'form',
    component: ListingFormPageComponent, // Usar el componente standalone aquí
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingsRoutingModule {}
