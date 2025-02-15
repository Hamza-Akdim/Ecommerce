import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';


const firebaseConfig = {
  apiKey: "AIzaSyABfzpVPXpbViZsZ30kRLFVAz9-WPg27oY",
  authDomain: "ecommerce-39cba.firebaseapp.com",
  projectId: "ecommerce-39cba",
  storageBucket: "ecommerce-39cba.firebasestorage.app",
  messagingSenderId: "488041240953",
  appId: "1:488041240953:web:ee5d7e45c60173b628b7a8"
};

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(firebaseConfig))
    //provideFirebaseApp(() => initializeApp({"projectId":"ecommerce-39cba","appId":"1:488041240953:web:ee5d7e45c60173b628b7a8","storageBucket":"ecommerce-39cba.firebasestorage.app","apiKey":"AIzaSyABfzpVPXpbViZsZ30kRLFVAz9-WPg27oY","authDomain":"ecommerce-39cba.firebaseapp.com","messagingSenderId":"488041240953"}))
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
