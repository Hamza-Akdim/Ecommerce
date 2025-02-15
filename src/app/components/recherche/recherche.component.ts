import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrl: './recherche.component.css'
})
export class RechercheComponent {

  searchResults: Product[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // S'abonner aux résultats de recherche
    this.apiService.searchProducts.subscribe((results) => {
      this.searchResults = results;
    });
  }

}
