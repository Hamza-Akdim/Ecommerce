import { effect, inject, Inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
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

  singIn(email: string, username: string,password:string):Observable<void>{
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

  logOut(): Observable<void>{
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }

  
}
