import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  products = [
    {
      "title": "Smartphone X200",
      "description": "Un smartphone performant avec un écran OLED et une caméra 108MP.",
      "price": 799.99,
      "image": "../../../assets/easyMarket_without_bg.png"
    },
    {
      "title": "Laptop UltraBook 15",
      "description": "Ordinateur portable léger et puissant avec processeur Intel i7.",
      "price": 1199.99,
      "image": "../../../assets/logo.svg"
    },
    {
      "title": "Montre Connectée FitPro",
      "description": "Montre connectée avec suivi de la santé et notifications intelligentes.",
      "price": 199.99,
      "image": "../../../assets/logo2.svg"
    },
    {
      "title": "Casque Bluetooth NoiseCancel",
      "description": "Casque audio sans fil avec réduction de bruit active.",
      "price": 249.99,
      "image": "../../../assets/logo1.svg"
    },
    {
      "title": "Tablette Graphique Pro",
      "description": "Tablette graphique avec stylet pour les artistes et designers.",
      "price": 349.99,
      "image": "../../../assets/logo2.svg"
    },
    {
      "title": "Smartphone X200",
      "description": "Un smartphone performant avec un écran OLED et une caméra 108MP.",
      "price": 799.99,
      "image": "../../../assets/easyMarket_without_bg.png"
    }
  ]

}
