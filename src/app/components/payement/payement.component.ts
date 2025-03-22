import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrl: './payement.component.css'
})
export class PayementComponent {

  @Input() commande: Product[] = [];
  isModalOpen = false;
  selectedPaymentMethod = '';
  paymentData = {
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvv: '',
    paypalEmail: ''
  };

   constructor(
      private cartService :CartService,
    ){}

   
  openModal(commande: Product[]) {
    this.commande = commande;
    this.isModalOpen = true;
  }


  closeModal() {
    this.isModalOpen = false;
  }

  

 
  processPayment() {
    if (this.selectedPaymentMethod === 'creditCard') {
      console.log('Paiement par carte:', this.paymentData);
    } else if (this.selectedPaymentMethod === 'paypal') {
      console.log('Paiement via PayPal:', this.paymentData.paypalEmail);
    }

    this.cartService.commander(this.commande,1).subscribe({
      next: (response)=>{
        console.log("commande passe avec succes:",response);
        alert("commande passe avec succes !");
  
      },
      error: (error)=>{
        console.error('Erreur lors de la commande:', error);
        alert('Une erreur est survenue lors de la commande.');
      }
    })
    this.closeModal();
  }
}

