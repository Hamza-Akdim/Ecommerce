import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrl: './product-details-modal.component.css'
})
export class ProductDetailsModalComponent {

  constructor(
    public cartService : CartService,
    public dialogRef: MatDialogRef<ProductDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}



  addToCart(product: any): void {
    this.cartService.addToCart(product);
    console.log('Produit ajouté au panier :', product);
    this.dialogRef.close() 
  }

}
