import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationsPageComponent } from '@listings/pages/listing-list/accommodations-page.component';
import { ListingDetailPageComponent } from '@app/features/listings/pages/listing-detail/listing-detail-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: ListingDetailPageComponent,
  },
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
