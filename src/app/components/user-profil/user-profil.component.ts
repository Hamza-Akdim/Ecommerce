import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/UserInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.css',
})
export class UserProfilComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isEditing: boolean = false; // Variable pour afficher/masquer le formulaire d'édition
  isChangingPassword: boolean = false;
  user: UserInterface = {
    username: '',
    email: '',
  };

  currentPassword: string = '';
  newPassword: string = '';

  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;

  message: string = '';
  isSuccess: boolean = false;

  // Récupérer les informations de l'utilisateur
  ngOnInit() {
    this.authService.user$.subscribe((user) => {
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
    this.isChangingPassword = true;
  }

  cancelPasswordChange() {
    this.isChangingPassword = false;
    this.currentPassword = '';
    this.newPassword = '';
    this.message = '';
  }

  updatePassword() {
    this.authService
      .updatePassword(this.currentPassword, this.newPassword)
      .subscribe({
        next: () => {
          this.message = 'Mot de passe mis à jour avec succès.';
          this.isSuccess = true;
          this.currentPassword = '';
          this.newPassword = '';
          setTimeout(() => {
            this.isChangingPassword = false;
            this.message = '';
          }, 4000);
        },
        error: (err) => {
          this.message = 'Erreur : ' + err.message;
          this.isSuccess = false;
        },
      });
  }

  togglePasswordVisibility(field: string) {
    if (field === 'current') {
      this.showCurrentPassword = !this.showCurrentPassword;
    } else if (field === 'new') {
      this.showNewPassword = !this.showNewPassword;
    }
  }

  // Fonction de déconnexion
  logout() {
    this.authService.logOut();
    this.router.navigateByUrl('/');
  }
}
