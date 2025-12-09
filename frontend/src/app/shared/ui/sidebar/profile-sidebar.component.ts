import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '@features/auth/domain/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-profile-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-sidebar-component.html',
  styleUrls: ['./profile-sidebar-component.scss']
})
export class ProfileSidebarComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  isAdmin = false;

  ngOnInit(): void {
    this.authService.getCurrentUser().pipe(take(1)).subscribe(response => {
      const user = response && response.success ? response.data : null;
      this.isAdmin = user ? this.authService.hasRole(user, 'ADMIN') : false;
    });
  }

  goToHome(): void {
    // getCurrentUser() returns Observable<StandardResult<User>>, subscribe and take one emission
    this.authService.getCurrentUser().pipe(take(1)).subscribe(response => {
      const user = response && response.success ? response.data : null;
      if (user && this.authService.hasRole(user, 'ADMIN')) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/home']);
      }
    }, () => {
      // on error, navigate to home
      this.router.navigate(['/home']);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}