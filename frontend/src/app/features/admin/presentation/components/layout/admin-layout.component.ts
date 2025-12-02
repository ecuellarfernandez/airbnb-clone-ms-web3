import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../users/domain/models/user.model';
import { AuthService } from '@app/features/auth/domain/services/auth.service';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-admin-layout',
  standalone: false,
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  user?: User;
  avatarUrl: string = '';
  showUserMenu: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe({
      next: (resp) => {
        if (resp.success && resp.data) {
          this.user = resp.data;
          this.avatarUrl = this.generateAvatarUrl(this.user);
        }
      },
      error: (err) => {
        console.log('No se pudo obtener usuario (posiblemente no logueado o SSR):', err.message);
        this.avatarUrl = this.generateAvatarUrl();
      }
    });
  }

  private generateAvatarUrl(user?: User): string {
    if (!user) {
      return `https://ui-avatars.com/api/?name=Guest&background=random&size=128`;
    }
    const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random&size=128`;
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
