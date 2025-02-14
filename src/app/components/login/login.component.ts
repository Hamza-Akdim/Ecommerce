import { Component, Inject, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authService = inject(AuthService);

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);

  errorMessage: string|null = null;

  form = this.fb.group({
    email: ['', [Validators.required,Validators.email]],
    password: ['',Validators.required],
  });

  OnSubmit(): void {

    const rawForm = this.form.getRawValue()
    this.authService.logIn(rawForm.email!,rawForm.password!)
    .subscribe({
      next:()=>{
        this.router.navigateByUrl('/');
      },
      error: (err)=>{
        this.errorMessage = err.code;
      }
    })
  }
  
}
