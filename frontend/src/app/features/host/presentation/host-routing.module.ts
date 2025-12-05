import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostMainPageComponent } from './host-main-page/host-main-page.component';

import { ListingDetailsPageComponent } from './listing-details-page/listing-details-page.component';

const routes: Routes = [
  {
    path: '',
    component: HostMainPageComponent
  },
  {
    path: 'listing-details/:id',
    component: ListingDetailsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostRoutingModule { }
