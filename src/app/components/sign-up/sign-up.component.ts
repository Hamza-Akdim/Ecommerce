import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);
  message = '';

  showPassword = false;
  showConfirmPassword = false;

  form = this.fb.group(
    {
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator.bind(this) }
  );

  errorMessage: string | null = null;

  OnSubmit(): void {

    if (this.form.invalid || this.form.hasError('mismatch')) {
      this.form.markAllAsTouched(); // Mark all fields as touched to show errors
      return;
    }

    const id = 1;
    const rawForm = this.form.getRawValue();
    this.authService
      .singUp(rawForm.email!, rawForm.username!, rawForm.password!)
      .subscribe({
        next: () => {
          this.message = "Un e-mail de vérification vous a été envoyé. Veuillez vérifier votre boîte mail.";
          setTimeout(() => { this.message = ''; }, 5000); // 5 secondes },

        },
        error: (err) => {
          this.errorMessage = err.code;
        },
      });
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
