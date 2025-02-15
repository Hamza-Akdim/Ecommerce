import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  searchProducts = new BehaviorSubject<Product[]>([]);// Subject pour émettre les résultats de recherche

  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }

   // Rechercher des produits
 
  search(searchQuery: string): void {
    this.getProducts().subscribe(
      (products) => {
        const filteredProducts = products.filter((product) => {
          const titleMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
          const descriptionMatch = product.description.toLowerCase().includes(searchQuery.toLowerCase());
          const categoryMatch = product.category.toLowerCase().includes(searchQuery.toLowerCase());
          return titleMatch || descriptionMatch || categoryMatch;
        });
        this.searchProducts.next(filteredProducts);
      },
      (error) => {
        console.error('Erreur lors de la recherche', error);
        this.searchProducts.next([]); 
      }
    );
  }
  
}