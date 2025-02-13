import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from './models/product.model';
import { ApiService } from './services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'ecommerce_project';
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

