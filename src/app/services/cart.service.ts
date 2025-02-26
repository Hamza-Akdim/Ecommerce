import { Inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../app.config.ecom/app.config.modules';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  // Ajouter un produit au panier
  addToCart(product: Product) {
    const currentCart = this.cartItems.value;
    this.cartItems.next([...currentCart, product]);
  }


  suprimerProduct(id: number): Product {
    // Copie du panier actuel
    const updatedPanier = [...this.cartItems.value];
    // Trouver l'index du premier produit correspondant à l'ID
    const index = updatedPanier.findIndex(product => product.id === id);
    const itemDroped = updatedPanier[index]
    // Supprimer le produit SEULEMENT s'il est trouvé
    if (index !== -1) {
      updatedPanier.splice(index, 1);
    }
    // Mettre à jour le panier
    this.cartItems.next(updatedPanier);
    return itemDroped
  }
  

  viderPanier(){
    this.cartItems.next([]);
  }

  getPanier(){
    return this.cartItems.value;
  }


  commander(products: Product [],userId: number): Observable<any>{
    if(products.length>0){
      const commande = {
        userId: userId,
        date:new Date().toISOString(),
        products: products
      };
      
      this.cartItems.next([]);
      return this.http.post(`${this.config.endpoints.carts}`,commande);
    }else {
      throw new Error('Le panier est vide.');
    }
  }
  
}
