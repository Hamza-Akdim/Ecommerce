import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  products: Product[] = [];
  showTable: boolean = false;

  constructor(private api: ApiService) {}

  toggleProducts() {
    if (!this.showTable) {
      this.api.getProducts().subscribe(response => {
        this.products = response;
        this.showTable = true;
      });
    } else {
      this.showTable = false; 
    }
  }

}
