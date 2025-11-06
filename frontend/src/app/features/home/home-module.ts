import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing-module';
import {HomePageComponent} from '@app/features/home/pages/home-page/home-page.component';
import {SharedModule} from '@app/shared/shared-module';
import {ListingsModule} from '@listings/listings-module';
import {CarouselItemDirective} from '@ui/card-slider/card-slider.component';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ListingsModule,
    CarouselItemDirective,
  ]
})
export class HomeModule { }
