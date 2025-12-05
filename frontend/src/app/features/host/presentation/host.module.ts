import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostRoutingModule } from './host-routing.module';
import { HostMainPageComponent } from './host-main-page/host-main-page.component';
import { HostSidebarComponent } from './components/host-sidebar/host-sidebar.component';
import { SharedModule } from '@app/shared/shared-module';
import { ConfirmationModalComponent } from '@app/shared/ui/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    HostMainPageComponent,
    HostSidebarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HostRoutingModule,
    ConfirmationModalComponent
  ]
})
export class HostModule { }
