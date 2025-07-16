import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  email: string = '';
  password: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  this.authService.login(this.loginForm.value).subscribe({
    next: () => {
        this.router.navigate(['/appointments/reservar']);
      },
      error: err => {
        if (err.status === 401) {
          alert('Email o contraseña inválidos.');
        } else {
          alert('Ocurrió un error inesperado.');
        }
      }
    });
  }
}

