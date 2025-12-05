import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-sidebar',
  standalone: false,
  templateUrl: './host-sidebar.component.html',
  styleUrls: ['./host-sidebar.component.scss']
})
export class HostSidebarComponent {
  
  constructor(private router: Router) {}

  logout(): void {
    this.router.navigate(['/auth/login']);
  }
}
