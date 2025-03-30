import { effect, inject, Inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, EmailAuthProvider, GoogleAuthProvider, reauthenticateWithCredential, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword, updateProfile, user } from '@angular/fire/auth';
import { UserInterface } from '../models/UserInterface';
import { from, Observable } from 'rxjs';
import { doc, Firestore } from '@angular/fire/firestore';
import { setDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  firestore = inject(Firestore);
  user$ = user(this.firebaseAuth); //utilisateur
  currentUserSignal = signal<UserInterface | null | undefined>(undefined);

  constructor() {
    //mettre ajour currenusersignal
    effect(() => {
      this.user$.subscribe((currentUser) => {
        this.currentUserSignal.set(
          currentUser
            ? {
                // uid: currentUser.uid!,
                email: currentUser.email!,
                username: currentUser.displayName!,
              }
            : null
        );
      });
    });
  }

    // Connexion avec Google
    loginWithGoogle(): Observable<void> {
      const provider = new GoogleAuthProvider();
      const promise = signInWithPopup(this.firebaseAuth, provider)
        .then(() => {}); // Pas de retour nécessaire, l'observable s'en charge

      return from(promise);
    }

  // Inscription avec e-mail et mot de passe + envoi de vérification
  singUp(email: string, username: string, password: string) {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(response => {
        updateProfile(response.user, { displayName: username });
        return this.sendVerificationEmail();
      });

    return from(promise);
  }

  // Envoi de l'e-mail de vérification
  sendVerificationEmail(): Observable<void> {
    if (this.firebaseAuth.currentUser) {
      const promise = sendEmailVerification(this.firebaseAuth.currentUser,{url:"http://localhost:4200",handleCodeInApp:true});
      return from(promise);
    } else {
      throw new Error('Utilisateur non connecté');
    }
  }

  logIn(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email!,
      password!
    ).then(() => {});

    return from(promise);
  }

  logOut(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }

  // Mise à jour du profil utilisateur
  updateUserProfile(user: UserInterface): Observable<void> {
    if (this.firebaseAuth.currentUser) {
      const promise = updateProfile(this.firebaseAuth.currentUser, {
        displayName: user.username,
      }).catch((error) => {
        throw error;
      });

      return from(promise);
    } else {
      throw new Error('Utilisateur non connecté');
    }
  }

  updatePassword(
    currentPassword: string,
    newPassword: string
  ): Observable<void> {
    const currentUser = this.firebaseAuth.currentUser;
    if (!currentUser || !currentUser.email) {
      throw new Error('Utilisateur non connecté');
    }

    const credential = EmailAuthProvider.credential(
      currentUser.email,
      currentPassword
    );

    const promise = reauthenticateWithCredential(currentUser, credential)
      .then(() => updatePassword(currentUser, newPassword))
      .catch((error) => {
        throw error;
      });

    return from(promise);
  }



}



