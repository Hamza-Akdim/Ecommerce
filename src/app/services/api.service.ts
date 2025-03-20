import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HistoryInterface } from '../models/HistoryInterface';
import { APP_CONFIG, AppConfig } from '../app.config.ecom/app.config.modules';
import { key } from './env';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  searchProducts = new BehaviorSubject<Product[]>([]);// Subject pour émettre les résultats de recherche

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.config.endpoints.products}`);
  } 

  getAllCategories():Observable<string[]>{
    return this.http.get<string[]>(`${this.config.endpoints.categories}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.config.endpoints.category}/${category}`);
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
    return this.http.get<HistoryInterface[]>(`${this.config.endpoints.user}/${userId}`);
  }


 

  private apiKey = key;
  chat(userMessage: string): Observable<any> {
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${this.apiKey}`,
      "Content-Type": "application/json"
    });

    const body = {
      model: "deepseek/deepseek-r1-zero:free",
      messages: [
        { 
          role: "system", 
          content: `Tu es l'assistant virtuel d'EasyMarket, une plateforme e-commerce où les utilisateurs peuvent acheter des vêtements, des appareils électroniques et des chaussures pour hommes et femmes. 
          Tu assistes les utilisateurs en français et les aides à créer un compte, passer des commandes, gérer leur historique d'achats et rechercher des produits en filtrant par catégorie. 
          Fournis des réponses claires et précises basées sur leurs besoins. 
          Si un utilisateur a besoin d'une assistance plus approfondie, oriente-le vers notre support : contact@easymarket.com ou au +33 1 23 45 67 89. 
          Réponds toujours de manière professionnelle et engageante.`
        },
        { role: "user", content: userMessage }
      ]
    };

    return this.http.post(this.config.endpoints.bot, body, { headers });
}


  
  
}