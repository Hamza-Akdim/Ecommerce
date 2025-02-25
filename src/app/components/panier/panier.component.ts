import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmDropComponent } from '../dialog-confirm-drop/dialog-confirm-drop.component';
import { ApiService } from '../../services/api.service';
import { HistoryInterface } from '../../models/HistoryInterface';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnInit {


  productsPanier: Product[] = [];
  purchaseHistory : HistoryInterface[] = [];
  itemDropedTable: Product[] = []

  constructor(
    private cartService :CartService,
    private apiService: ApiService,
    public dialog : MatDialog
  ){}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((products)=>{
      this.productsPanier = products;
    });

    this.apiService.getCommandeByUserId(1).subscribe((history)=>{
      this.purchaseHistory = history;
    })
  }

  discount(): number{
    let total = 0
    for (let product of this.productsPanier) {
      total += product.price;
      
    }
    return total;
  }

  //suprimer tout les produit si oui
  viderPanier() {
    //recupere les data
    this.itemDropedTable = this.cartService.getPanier()
    const dialogRef = this.dialog.open(DialogConfirmDropComponent);
    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this.cartService.viderPanier()
      }
    })
    
  }
  suprimerProduct(id: number) {
    const itemDroped = this.cartService.suprimerProduct(id);
    this.itemDropedTable.push(itemDroped)
  }

  commander(): void {
      this.cartService.commander(this.productsPanier,1).subscribe({
        next: (response)=>{
          console.log("commande passe avec succes:",response);
          alert("commande passe avec succes !");

        },
        error: (error)=>{
          console.error('Erreur lors de la commande:', error);
          alert('Une erreur est survenue lors de la commande.');
        }
      })
  }

  retour() {
    if (this.itemDropedTable.length > 0) {
      const itemToReturn = this.itemDropedTable[this.itemDropedTable.length - 1];
  
      this.cartService.addToCart(itemToReturn);
  
      this.itemDropedTable.pop();
    } else {
      console.log("Aucun produit à retourner.");
    }
  }
  
  

}
