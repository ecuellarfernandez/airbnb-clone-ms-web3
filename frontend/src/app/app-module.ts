import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CoreModule } from '@core/core.module';
import { AccommodationsRepository } from '@features/listings/domain/repositories/accommodations.repository';
import { AccommodationsRepositoryImpl } from '@features/listings/infrastructure/repositories/accommodations.repository.impl';
import { authInterceptor } from '@core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    App,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: AccommodationsRepository, useClass: AccommodationsRepositoryImpl },
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
