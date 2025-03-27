import { effect, inject, Inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, EmailAuthProvider, reauthenticateWithCredential, signInWithEmailAndPassword, signOut, updatePassword, updateProfile, user } from '@angular/fire/auth';
import { UserInterface } from '../models/UserInterface';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  firebaseAuth = inject(Auth)
  user$ = user(this.firebaseAuth); //utilisateur
  currentUserSignal = signal<UserInterface | null| undefined>(undefined);


  constructor() {
    //mettre ajour currenusersignal
    effect(()=>{
      this.user$.subscribe(currentUser =>{
        this.currentUserSignal.set(currentUser? {email: currentUser.email!,username: currentUser.displayName!}: null);
      });
    });
  }
  
  singUp(email: string, username: string,password:string):Observable<void>{
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email!,
      password!
    ).then((response) => updateProfile(response.user, {displayName: username}));


    return from(promise)
  }

  logIn(email: string,password: string): Observable<void>{
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email!,
      password!
    ).then(()=>{});

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

  updatePassword(currentPassword: string, newPassword: string): Observable<void> {
    const currentUser = this.firebaseAuth.currentUser;
    if (!currentUser || !currentUser.email) {
      throw new Error('Utilisateur non connecté');
    }

    const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);

    const promise = reauthenticateWithCredential(currentUser, credential)
      .then(() => updatePassword(currentUser, newPassword))
      .catch((error) => {
        throw error;
      });

    return from(promise);
  }


  
}



