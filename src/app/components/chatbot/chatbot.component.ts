import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isOpen = false;
  messages: { text: string; user: boolean }[] = [];
  userMessage: string = '';

  // Liste de réponses aléatoires pour informer et encourager le user
  botResponses: string[] = [
    "Merci de votre visite ! Explorez nos collections exclusives sur notre site. 😊",
    "Notre équipe est à votre service ! Vous pouvez nous laisser un email à contact@calais-em.com 📩",
    "Vous cherchez quelque chose de précis ? Consultez notre catalogue en ligne ! 🛍️",
    "Nous offrons des réductions spéciales cette semaine ! Ne ratez pas nos offres. 🔥",
    "Votre satisfaction est notre priorité ! N'hésitez pas à nous contacter pour plus d'infos. 📞",
    "Pour toute question, écrivez-nous à contact@esymaarket.com. On vous répond rapidement ! 💌",
    "Envie d'un produit unique ? Découvrez nos nouveautés en avant-première sur notre site ! 🌟"
  ];

  toggleChat() {
    this.isOpen = !this.isOpen;

    if (this.isOpen && this.messages.length === 0) {
      this.messages.push({ text: '👋 Bonjour ! Bienvenue sur notre site. Comment puis-je vous aider ?', user: false });
    }
  }

  sendMessage() {
    if (this.userMessage.trim() === '') return;

    // Ajouter le message de l'utilisateur
    this.messages.push({ text: this.userMessage, user: true });

    // Simuler une réponse aléatoire du bot après 1s
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * this.botResponses.length);
      const botReply = this.botResponses[randomIndex];
      this.messages.push({ text: botReply, user: false });
    }, 1000);

    this.userMessage = '';
  }
}
