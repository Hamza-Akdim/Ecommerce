import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { PanierComponent } from './components/panier/panier.component';
import { UserProfilComponent } from './components/user-profil/user-profil.component';

const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'signUp', component: SignUpComponent},
  {path : 'login', component : LoginComponent},
  {path : 'panier', component: PanierComponent},
  {path: 'user-profil', component: UserProfilComponent},
  {path: '**', component: NotFoundComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
