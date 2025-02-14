import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  products = [1,2,3,4,5,6];

}
