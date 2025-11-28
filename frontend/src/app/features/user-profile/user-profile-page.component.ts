import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSidebarComponent } from '../../shared/ui/sidebar/profile-sidebar.component';

interface User {
  name: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  memberSince: string;
  isVerified: boolean;
  avatar: string | null;
  stats: {
    totalReservations: number;
    reviewsWritten: number;
    favorites: number;
  };
  languages: string[];
  interests: string[];
}

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [CommonModule, ProfileSidebarComponent],
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent {
  user: User = {
    name: 'María García',
    bio: 'Amante de los viajes y exploradora de nuevos destinos. Siempre buscando la próxima aventura.',
    email: 'maria.garcia@example.com',
    phone: '+34 612 345 678',
    location: 'Madrid, España',
    memberSince: 'Marzo 2023',
    isVerified: true,
    avatar: null, // Ruta a la imagen en assets
    stats: {
      totalReservations: 12,
      reviewsWritten: 8,
      favorites: 24
    },
    languages: ['Español', 'Inglés', 'Francés'],
    interests: ['Viajes', 'Fotografía', 'Gastronomía', 'Naturaleza', 'Arte']
  };


}