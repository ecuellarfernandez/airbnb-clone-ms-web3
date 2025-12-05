import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostRoutingModule } from './host-routing.module';
import { HostMainPageComponent } from './host-main-page/host-main-page.component';
import { MakeMeHostComponent } from './components/make-me-host/make-me-host.component';
import { SharedModule } from '@app/shared/shared-module';

@NgModule({
  declarations: [
    HostMainPageComponent,
    MakeMeHostComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HostRoutingModule
  ]
})
export class HostModule { }
