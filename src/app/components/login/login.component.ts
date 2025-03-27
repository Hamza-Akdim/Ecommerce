declare let google: any;
import { Component, Inject, inject, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {



  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id :'',
      callback:(resp : any)=>{

      }
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme:'filed_blue',
      size:'large',
      shape:'rectangle',
      width:350  
    })

  }

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

  loginGoogle() {
    this.authService.loginWithGoogle().subscribe({
      next:()=>{
        this.router.navigateByUrl('/');
      },
      error: (err)=>{
        this.errorMessage = err.code;
      }
    })
    }
  
}
