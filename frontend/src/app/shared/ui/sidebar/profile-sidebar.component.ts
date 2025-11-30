import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-sidebar-component.html',
  styleUrls: ['./profile-sidebar-component.scss']
})
export class ProfileSidebarComponent {
  // Aquí podrías agregar lógica para cerrar sesión
  logout() {
    console.log('Cerrando sesión...');
  }
}