import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconLogoComponent } from './ui/icon-logo/icon-logo.component';
import { CardComponent } from './ui/card/card.component';
import { CardSliderComponent } from './ui/card-slider/card-slider.component';
import { NavTabsComponent } from './ui/nav-tabs/nav-tabs.component';
import { SearchFilterComponent } from './ui/search-filter/search-filter.component';
import { DatePickerComponent } from './ui/date-picker/date-picker.component';
import { GuestSelectorComponent } from './ui/guest-selector/guest-selector.component';
import { LocationSearchComponent } from './ui/location-search/location-search.component';

@NgModule({
  declarations: [
    CardComponent,
    CardSliderComponent,
    IconLogoComponent,
    NavTabsComponent,
    SearchFilterComponent,
    DatePickerComponent,
    GuestSelectorComponent,
    LocationSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    CardComponent,
    CardSliderComponent,
    IconLogoComponent,
    NavTabsComponent,
    SearchFilterComponent,
    DatePickerComponent,
    GuestSelectorComponent,
    LocationSearchComponent
  ]
})
export class SharedModule { }
/* despues dividir en bundles mas pequeños, ahora está asi por tiempo bebes*/
