import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  authService = inject(AuthService);

  // Signal pour gérer l'état de connexion
  isLoggedIn = signal(false);

  constructor() {
    this.authService.user$.subscribe(user => {
      this.isLoggedIn.set(!!user);
    });
  }

  toggleAuth(): void {
    if (this.isLoggedIn()) {
      this.authService.logOut().subscribe(() => {
        this.isLoggedIn.set(false);
      });
    } else {
      window.location.href = '/login';
    }
  }
}