import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isOpen = false;
  messages: { text: string; user: boolean }[] = [];
  userMessage: string = '';

  constructor(
      public apiService: ApiService,
    ) {};

  toggleChat() {
    this.isOpen = !this.isOpen;

    if (this.isOpen && this.messages.length === 0) {
      this.messages.push({ text: '👋 Bonjour ! Bienvenue sur notre site. Comment puis-je vous aider ?', user: false });
    }
  }

  formatApiResponse(response: string): string {
    let cleanedText = response.replace(/^\\boxed{(.*)}$/, '$1').trim();
    cleanedText = cleanedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    cleanedText = cleanedText.replace(/- (.*?)(\n|$)/g, '<li>$1</li>');
    cleanedText = cleanedText.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
    return cleanedText;
  }

  sendMessage() {
    if (this.userMessage.trim() === '') return;
    this.messages.push({ text: this.userMessage, user: true });
  
    this.apiService.chat(this.userMessage).subscribe(
      response => {
        console.log(response);
  
        const rawText = response.choices[0].message.content;
        const formattedText = this.formatApiResponse(rawText);

        this.messages.push({ text: formattedText, user: false });
      },
      error => {
        console.error("Erreur lors de la réponse du chatbot", error);
        this.messages.push({ text: "Désolé, le service de chat est actuellement indisponible.", user: false });
      }
    );
  
    this.userMessage = '';
  }
}
