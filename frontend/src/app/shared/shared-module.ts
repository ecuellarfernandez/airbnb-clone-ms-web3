import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './ui/header/header.component';
import { RouterModule } from '@angular/router';
import { CardCarouselComponent } from './ui/card-carousel/card-carousel.component';
import { IconLogoComponent } from './ui/icon-logo/icon-logo.component';



@NgModule({
  declarations: [HeaderComponent, CardCarouselComponent, IconLogoComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [CommonModule, RouterModule, HeaderComponent]
})
export class SharedModule {
  /* despues dividir en bundles mas pequeños, ahora está asi por tiempo bebes*/
}
