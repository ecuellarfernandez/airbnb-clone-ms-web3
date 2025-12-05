import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostMainPageComponent } from './host-main-page/host-main-page.component';

const routes: Routes = [
  {
    path: '',
    component: HostMainPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostRoutingModule { }
