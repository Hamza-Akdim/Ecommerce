import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/UserInterface';
import { Router} from '@angular/router';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.css'
})
export class UserProfilComponent {

  authService = inject(AuthService);
  router = inject(Router);
  isEditing: boolean = false;  // Variable pour afficher/masquer le formulaire d'édition
  user: UserInterface = {
    username: '',
    email: ''
  };

  // Récupérer les informations de l'utilisateur
  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.user.username = user.displayName || '';
        this.user.email = user.email || '';
      }
    });
  }

  editProfile() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    this.user.username = '';
    this.user.email = '';
  }

  // Fonction pour enregistrer les modifications
  saveChanges() {
    this.authService.updateUserProfile(this.user);
    this.isEditing = false;
  }


  changePassword() {
    alert('Page de changement de mot de passe à implémenter');
  }

  // Fonction de déconnexion
  logout() {
    this.authService.logOut();
    this.router.navigateByUrl("/");
  }
 
}
