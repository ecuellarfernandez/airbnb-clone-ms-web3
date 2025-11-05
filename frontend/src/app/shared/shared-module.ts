import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './ui/header/header.component';
import { RouterModule } from '@angular/router';
import { IconLogoComponent } from './ui/icon-logo/icon-logo.component';
import {CardComponent} from '@ui/card/card.component';

@NgModule({
  declarations: [HeaderComponent, IconLogoComponent, CardComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [CommonModule, RouterModule, HeaderComponent, CardComponent]
})
export class SharedModule {
  /* despues dividir en bundles mas pequeños, ahora está asi por tiempo bebes*/
}
