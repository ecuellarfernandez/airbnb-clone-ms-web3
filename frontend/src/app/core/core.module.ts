import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HeaderComponent } from './layouts/header/header.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared-module';
import { BookingLayoutComponent } from './layouts/booking-layout/booking-layout.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    AuthLayoutComponent,
    HeaderComponent,
    PageNotFoundComponent,
    BookingLayoutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    MainLayoutComponent,
    AuthLayoutComponent,
    HeaderComponent,
    PageNotFoundComponent,
    BookingLayoutComponent,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
