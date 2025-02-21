import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ApiService } from '../../services/api.service';
import { ProductDetailsModalComponent } from '../product-details-modal/product-details-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrl: './recherche.component.css'
})
export class RechercheComponent {

  searchResults: Product[] = [];

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getDefaultProduct();
    // S'abonner aux résultats de recherche
    this.apiService.searchProducts.subscribe((results) => {
      this.searchResults = results;
    });
  }
  
  getDefaultProduct(): void {
    this.apiService.getProducts().subscribe((products) => {
      this.searchResults = products;
    });
  }

  openProductDetails(product: any): void {
      this.dialog.open(ProductDetailsModalComponent, {
        width: '600px', // Largeur du modal
        data: { product } // Passer les données du produit au modal
      });
  }
    

}
