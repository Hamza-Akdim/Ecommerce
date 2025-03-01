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
import { RechercheComponent } from './components/recherche/recherche.component';
import { ProductDetailsModalComponent } from './components/product-details-modal/product-details-modal.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { FooterComponent } from './components/footer/footer.component';
import { PanierComponent } from './components/panier/panier.component';
import { UserProfilComponent } from './components/user-profil/user-profil.component';
import { DialogConfirmDropComponent } from './components/dialog-confirm-drop/dialog-confirm-drop.component';
import { AppConfigModule } from './app.config.ecom/app.config.modules';
import { CategoriesComponentComponent } from './components/categories-component/categories-component.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';


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
    HeaderComponent,
    RechercheComponent,
    ProductDetailsModalComponent,
    FooterComponent,
    PanierComponent,
    UserProfilComponent,
    DialogConfirmDropComponent,
    CategoriesComponentComponent,
    ChatbotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppConfigModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(firebaseConfig))
    //provideFirebaseApp(() => initializeApp({"projectId":"ecommerce-39cba","appId":"1:488041240953:web:ee5d7e45c60173b628b7a8","storageBucket":"ecommerce-39cba.firebasestorage.app","apiKey":"AIzaSyABfzpVPXpbViZsZ30kRLFVAz9-WPg27oY","authDomain":"ecommerce-39cba.firebaseapp.com","messagingSenderId":"488041240953"}))
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
