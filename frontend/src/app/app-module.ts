import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { LayoutModule } from './presentation/layout/layout-module';
import { AccommodationsRepository } from '@domain/repositories/accommodations.repository';
import { AccommodationsRepositoryImpl } from './infrastructure/repositories/accommodations.repository.impl';

@NgModule({
  declarations: [
    App,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: AccommodationsRepository, useClass: AccommodationsRepositoryImpl },
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
