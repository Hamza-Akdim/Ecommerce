import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FirestoreService } from '../../services/firestore.service';
import { Category } from '../../models/product.model';

@Component({
  selector: 'app-categories-component',
  templateUrl: './categories-component.component.html',
  styleUrls: ['./categories-component.component.css']
})
export class CategoriesComponentComponent implements AfterViewInit,OnInit {
  @ViewChild('categoriesContainer', { static: false }) categoriesContainer!: ElementRef;

  
  categories: Category[] = [];


  constructor(
      public apiService: ApiService,
      private firestoreService:FirestoreService,
  ) {}

  ngOnInit(): void {
    this.firestoreService.getCategories().subscribe(
      (data)=>{
        this.categories = data;
        console.log(this.categories);
        
      }
    );
    
    
  };


  ngAfterViewInit() {
    this.startAutoScroll();
  }


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


  scrollLeft() {
    this.categoriesContainer.nativeElement.scrollBy({ left: -220, behavior: 'smooth' });
  }


  scrollRight() {
    this.categoriesContainer.nativeElement.scrollBy({ left: 220, behavior: 'smooth' });
  }

  onCategorySelect(category: string) :void {
    this.apiService.searchByCategory(category);
  }
}
