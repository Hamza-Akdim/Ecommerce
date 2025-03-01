import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-categories-component',
  templateUrl: './categories-component.component.html',
  styleUrls: ['./categories-component.component.css']
})
export class CategoriesComponentComponent implements AfterViewInit {
  @ViewChild('categoriesContainer', { static: false }) categoriesContainer!: ElementRef;

  categories = [
    { name: 'jewelery', image: 'assets/categories-image/bijoux.png' },
    { name: 'men\'s clothing', image: 'assets/categories-image/men.png' },
    { name: 'chaussures', image: 'assets/categories-image/choce.png' },
    { name: 'basket', image: 'assets/categories-image/bas.png' },
    { name: 'electronics', image: 'assets/categories-image/tele.png' },
    { name: 'children', image: 'assets/categories-image/lego.png' },
    { name: 'sport', image: 'assets/categories-image/sport.png' },
    { name: 'women\'s clothing', image: 'assets/categories-image/wmen.png' }
  ];

  duplicatedCategories: any[] = [];


  constructor(
      public apiService: ApiService,
    ) {}

  ngAfterViewInit() {
    this.duplicateCategories();
    this.startAutoScroll();
  }

  // 🔁 Duplique les catégories pour l'effet de boucle fluide
  duplicateCategories() {
    this.duplicatedCategories = [...this.categories, ...this.categories];
  }

  // 🌀 Défilement automatique lent avec transition fluide
  startAutoScroll() {
    setInterval(() => {
      if (this.categoriesContainer) {
        this.categoriesContainer.nativeElement.style.transition = "transform 0.8s ease-in-out"; // Lenteur du mouvement
        this.categoriesContainer.nativeElement.scrollBy({ left: 220, behavior: 'smooth' });

        // Réinitialise le scroll pour faire un effet boucle
        if (this.categoriesContainer.nativeElement.scrollLeft >= this.categoriesContainer.nativeElement.scrollWidth / 2) {
          this.categoriesContainer.nativeElement.scrollLeft = 0;
        }
      }
    }, 3000); // 3 secondes entre chaque défilement
  }

  // ⬅️ Défilement vers la gauche
  scrollLeft() {
    this.categoriesContainer.nativeElement.scrollBy({ left: -220, behavior: 'smooth' });
  }

  // ➡️ Défilement vers la droite
  scrollRight() {
    this.categoriesContainer.nativeElement.scrollBy({ left: 220, behavior: 'smooth' });
  }

  onCategorySelect(category: string) :void {
    this.apiService.searchByCategory(category);
  }
}
