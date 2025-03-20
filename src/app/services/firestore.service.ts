import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Category } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  getCategories(): Observable<any[]> {
    const categoriesRef = collection(this.firestore, 'categories'); 
    console.log(collectionData(categoriesRef, { idField: 'id' }));
    return collectionData(categoriesRef, { idField: 'id' });
  }



  async addCategories() {
    const categories: { name: string; image: string }[] = [
      { name: 'jewelery', image: 'assets/categories-image/bijoux.png' },
      { name: "men's clothing", image: 'assets/categories-image/men.png' },
      { name: 'chaussures', image: 'assets/categories-image/choce.png' },
      { name: 'basket', image: 'assets/categories-image/bas.png' },
      { name: 'electronics', image: 'assets/categories-image/tele.png' },
      { name: 'children', image: 'assets/categories-image/lego.png' },
      { name: 'sport', image: 'assets/categories-image/sport.png' },
      { name: "women's clothing", image: 'assets/categories-image/wmen.png' }
    ];

    const categoriesRef = collection(this.firestore, 'categories'); 

    for (const category of categories) {
      await addDoc(categoriesRef, category)
        .then(() => console.log(`Catégorie ajoutée : ${category.name}`))
        .catch(error => console.error(`Erreur d'ajout :`, error));
    }
  }

}
