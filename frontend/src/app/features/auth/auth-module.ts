import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from '@app/features/auth/pages/login/login-page.component';
import { RegisterPageComponent } from '@app/features/auth/pages/register/register-page.component';
import { AuthRoutingModule } from './auth-routing-module';

@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
