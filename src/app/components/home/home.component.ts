import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ApiService } from '../../services/api.service';
import { ProductDetailsModalComponent } from '../product-details-modal/product-details-modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  //limiter la taille des text
  expandedTitle = false;
  expandedDesc = false;

  constructor(
    private api: ApiService,
    public dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
      this.api.getProducts().subscribe(response => {
        this.products = response;
      });
  }

  openProductDetails(product: any): void {
    this.dialog.open(ProductDetailsModalComponent, {
      width: '600px', // Largeur du modal
      data: { product } // Passer les données du produit au modal
    });
  }
  

}
