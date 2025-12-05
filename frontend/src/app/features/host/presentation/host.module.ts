import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostRoutingModule } from './host-routing.module';
import { HostMainPageComponent } from './host-main-page/host-main-page.component';
import { SharedModule } from '@app/shared/shared-module';

@NgModule({
  declarations: [
    HostMainPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HostRoutingModule
  ]
})
export class HostModule { }
