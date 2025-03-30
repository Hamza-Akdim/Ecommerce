import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  authService = inject(AuthService);
  router = inject(Router);
  // Signal pour gérer l'état de connexion
  isLoggedIn = signal(false);

  searchQuery: string = '';
  tatalItemChoce: number =0;
  isLoading: boolean = false;
  searchResults: Product[] = [];
  allCategorie: string[] = [];
  //sotedValues = ['Price','Category','Title']

  constructor(
    public apiService: ApiService,
    public cartService: CartService
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
      this.router.navigateByUrl('/login');
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

  //select categorie
  ngOnInit(): void {
    this.apiService.getAllCategories().subscribe(
      (categories) => {
        this.allCategorie = categories;
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );

    //s'abonner au pagnier:
    this.cartService.cartItems$.subscribe((product)=>{
      this.tatalItemChoce = product.length;
    })

  }

  onCategorySelect(category: string) :void {
    this.apiService.searchByCategory(category);
    
    console.log("yes tu a cliquer ici", category);
  }

  //sorted
  // onSortedSelect(value: string): void {
  //   this.apiService.searchProducts.subscribe((products)=>{
  //     const sortedByValue = products.sort((a, b) => a.price - b.price);
  //     this.searchResults = sortedByValue;
  //   })
  //}
  

}