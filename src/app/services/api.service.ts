import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HistoryInterface } from '../models/HistoryInterface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  searchProducts = new BehaviorSubject<Product[]>([]);// Subject pour émettre les résultats de recherche

  private apiUrl = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  } 

  getAllCategories():Observable<string[]>{
    return this.http.get<string[]>(`${this.apiUrl}/products/categories`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/category/${category}`);
  }

  // Rechercher des produits
  searchByCategory(category: string): void{
    this.getProductsByCategory(category).subscribe(
      (products)=>{
        this.searchProducts.next(products);
      },
      (error) => {
        console.error('Erreur lors de la récupération des produits', error);
      }
    )
  }
 
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


  //gestion des commandes
  getCommandeByUserId(userId: number): Observable<HistoryInterface[]>{
    return this.http.get<HistoryInterface[]>(`${this.apiUrl}/carts/user/${userId}`);
  }

  
}