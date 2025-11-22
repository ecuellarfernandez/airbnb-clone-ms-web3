import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CoreModule } from '@core/core.module';
import { AccommodationsRepository } from '@features/listings/domain/repositories/accommodations.repository';
import { AccommodationsRepositoryImpl } from '@features/listings/infrastructure/repositories/accommodations.repository.impl';

@NgModule({
  declarations: [
    App,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: AccommodationsRepository, useClass: AccommodationsRepositoryImpl },
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
