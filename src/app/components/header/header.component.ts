import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  authService = inject(AuthService);
  // Signal pour gérer l'état de connexion
  isLoggedIn = signal(false);

  searchQuery: string = '';
  tatalItemChoce =0;
  isLoading: boolean = false;
  searchResults: Product[] = [];

  constructor(
    public apiService: ApiService
  ) {
    this.authService.user$.subscribe(user => {
      this.isLoggedIn.set(!!user);
    });

    // Écouter les résultats de recherche
    this.apiService.searchProducts.subscribe((results) => {
      this.searchResults = results;
      this.isLoading = false;
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

  // Lancer la recherche
  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.isLoading = true;
      this.apiService.search(this.searchQuery);
      console.log(this.searchResults)

      
    }
  }

}