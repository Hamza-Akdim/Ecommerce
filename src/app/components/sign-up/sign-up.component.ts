import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  //formulaire et validations
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });



  errorMessage: string | null = null;

  OnSubmit(): void {


    const rawForm = this.form.getRawValue()
    this.authService.singIn(rawForm.email!,rawForm.username!,rawForm.password!)
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