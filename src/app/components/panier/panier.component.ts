import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmDropComponent } from '../dialog-confirm-drop/dialog-confirm-drop.component';
import { ApiService } from '../../services/api.service';
import { HistoryInterface } from '../../models/HistoryInterface';
import { PayementComponent } from '../payement/payement.component';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css',
})
export class PanierComponent implements OnInit {

  @ViewChild('payementComponent') payementComponent!: PayementComponent;

  productsPanier: Product[] = [];
  purchaseHistory: HistoryInterface[] = [];
  itemDropedTable: Product[] = [];

  constructor(
    private cartService: CartService,
    private apiService: ApiService,
    public dialog : MatDialog
  ){}

  ngOnInit(): void {

    this.cartService.cartItems$.subscribe((products) => {
      this.productsPanier = products;
    });

    this.apiService.getCommandeByUserId(1).subscribe((history)=>{
      this.purchaseHistory = history;
    })

    // const currentUser = this.authService.currentUserSignal();
    // console.log('Current User : ', currentUser);
    // if (currentUser) {
    //   this.apiService
    //     .getCommandeByUserId(currentUser.id)
    //     .subscribe((history) => {
    //       this.purchaseHistory = history;
    //     });
    // }
    // console.log('Array TA3 Purchase', this.purchaseHistory);
  }

  discount(): number {
    let total = 0;
    for (let product of this.productsPanier) {
      total += product.price;
    }
    return total;
  }

  //suprimer tout les produit si oui
  viderPanier() {
    //recupere les data

    const dialogRef = this.dialog.open(DialogConfirmDropComponent);
    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this.itemDropedTable = this.cartService.getPanier()
        this.cartService.viderPanier()
      }
    });
  }
  suprimerProduct(id: number) {
    const itemDroped = this.cartService.suprimerProduct(id);
    this.itemDropedTable.push(itemDroped);
  }

  commander(): void {
      this.payementComponent.openModal(this.productsPanier);
  }

  retour() {
    if (this.itemDropedTable.length > 0) {
      const itemToReturn =
        this.itemDropedTable[this.itemDropedTable.length - 1];

      this.cartService.addToCart(itemToReturn);

      this.itemDropedTable.pop();
    } else {
      console.log('Aucun produit à retourner.');
    }
  }




}
