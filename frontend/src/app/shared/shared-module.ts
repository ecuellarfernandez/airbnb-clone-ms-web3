import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconLogoComponent } from './ui/icon-logo/icon-logo.component';
import { CardComponent } from './ui/card/card.component';
import { CardSliderComponent } from './ui/card-slider/card-slider.component';

@NgModule({
  declarations: [IconLogoComponent, CardComponent, CardSliderComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [CommonModule, RouterModule, IconLogoComponent, CardComponent, CardSliderComponent]
})
export class SharedModule {
  /* despues dividir en bundles mas pequeños, ahora está asi por tiempo bebes*/
}
