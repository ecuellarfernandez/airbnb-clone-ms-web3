import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './ui/header/header.component';
import { RouterModule } from '@angular/router';
import { CardCarouselComponent } from './ui/card-carousel/card-carousel.component';



@NgModule({
  declarations: [HeaderComponent, CardCarouselComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [CommonModule, RouterModule, HeaderComponent]
})
export class SharedModule { }
