import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ProfileSidebarComponent } from '../../shared/ui/sidebar/profile-sidebar.component';
import { AuthService } from '@features/auth/domain/services/auth.service';
import { ReservationsService } from '@features/reservations/domain/services/reservations.service';
import { User } from '@features/users/domain/models/user.model';

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [CommonModule, ProfileSidebarComponent, RouterModule],
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {
  user: User | null = null;
  avatarUrl: string = '';
  isLoading: boolean = true;
  errorMessage: string = '';
  showProfileContent: boolean = true;
  totalReservations: number = 0;
  private isBrowser: boolean;

  constructor(
    private authService: AuthService,
    private reservationsService: ReservationsService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Detectar cuando cambia la ruta para mostrar/ocultar el contenido del perfil
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.showProfileContent = event.url === '/users/profile';
    });
  }

  ngOnInit(): void {
    // Solo cargar usuario en el navegador, NO en SSR
    if (this.isBrowser) {
      this.loadCurrentUser();
      this.loadReservationsCount();
    }
  }

  loadCurrentUser(): void {
    if (!this.isBrowser) {
      return;
    }

    this.isLoading = true;
    this.authService.getCurrentUser().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.user = response.data;
          this.avatarUrl = this.generateAvatarUrl(this.user);
        } else {
          this.errorMessage = response.errorMessage || 'Error al cargar usuario';
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar información del usuario';
        this.isLoading = false;
        console.error('Error loading user:', error);
      }
    });
  }

  loadReservationsCount(): void {
    if (!this.isBrowser) {
      return;
    }

    this.reservationsService.getMyReservations().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.totalReservations = response.data.length;
        }
      },
      error: (error) => {
        console.error('Error loading reservations count:', error);
        this.totalReservations = 0;
      }
    });
  }

  private generateAvatarUrl(user: User): string {
    const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=256`;
  }

  getRoleNames(): string {
    return this.user?.roles.map(role => role.name).join(', ') || 'Sin roles';
  }
}