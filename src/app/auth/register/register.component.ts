import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

  if (this.registerForm.invalid) {
    return;
  }

  this.authService.register(this.registerForm.value).subscribe({
    next: () => {
      this.router.navigate(['/appointments/reservar']);
    },
    error: err => {
    }
  });
}


  register() {
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        console.log("navegamos")
        this.router.navigate(['/appointments/reservar']);
      },
      error: err => {
        alert('Registro fallido');
        console.error(err);
      }
    });
  }
}

