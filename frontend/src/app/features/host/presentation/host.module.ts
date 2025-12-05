import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostRoutingModule } from './host-routing.module';
import { HostMainPageComponent } from './host-main-page/host-main-page.component';
import { HostSidebarComponent } from './components/host-sidebar/host-sidebar.component';
import { SharedModule } from '@app/shared/shared-module';
import { ConfirmationModalComponent } from '@app/shared/ui/confirmation-modal/confirmation-modal.component';
import { MakeMeHostComponent } from './components/make-me-host/make-me-host.component';
import { ListingDetailsPageComponent } from './listing-details-page/listing-details-page.component';

@NgModule({
  declarations: [
    HostMainPageComponent,
    HostSidebarComponent,
    MakeMeHostComponent,
    ListingDetailsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HostRoutingModule,
    ConfirmationModalComponent
  ]
})
export class HostModule { }
