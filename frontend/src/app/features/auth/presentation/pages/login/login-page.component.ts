import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../domain/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    // Verificar si viene desde registro exitoso
    this.route.queryParams.subscribe(params => {
      if (params['registered'] === 'true') {
        this.successMessage = 'Account created successfully! Please login.';
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const loginData = this.loginForm.value;

    this.authService.login(loginData).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          // El token ya se guardó, ahora obtener el usuario actual para redirigir según rol
          this.authService.getCurrentUser().subscribe({
            next: (userResponse) => {
              if (userResponse.success && userResponse.data) {
                const user = userResponse.data;
                const roles = this.authService.getUserRoles(user);
                
                // Redirigir según el rol
                if (roles.includes('ADMIN')) {
                  this.router.navigate(['/admin']);
                } else if (roles.includes('HOST')) {
                  this.router.navigate(['/']);
                } else if (roles.includes('CLIENT')) {
                  this.router.navigate(['/']);
                } else {
                  this.router.navigate(['/']);
                }
              } else {
                this.router.navigate(['/']);
              }
              this.isLoading = false;
            },
            error: () => {
              // Si falla obtener el usuario, redirigir a home por defecto
              this.router.navigate(['/']);
              this.isLoading = false;
            }
          });
        } else {
          this.errorMessage = response.errorMessage || 'Login failed';
          this.isLoading = false;
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.errorMessage || 'Invalid username or password';
        this.isLoading = false;
      }
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}
