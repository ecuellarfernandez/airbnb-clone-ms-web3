import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppShellComponent } from './layout/app-shell/app-shell.component';
import { SharedModule } from '@app/shared/shared-module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppShellComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule){
    if(parent){
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
 }
