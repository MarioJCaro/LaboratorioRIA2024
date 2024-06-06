import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        success => {
          if (success) {
            const user = this.authService.getCurrentUser();
            if (user.role === 'ADMIN') {
              this.router.navigate(['/productos']);
            } else if (user.role === 'PANADERO') {
              this.router.navigate(['/ordenes']);
            } else if (user.role === 'USER') {
              this.router.navigate(['/catalogo']);
            }
          } else {
            this.snackBar.open('Error en el login. Verifique sus credenciales.', 'Cerrar', {
              duration: 3000,
            });
          }
        },
        error => {
          this.snackBar.open('Error en el login. Verifique sus credenciales.', 'Cerrar', {
            duration: 3000,
          });
        }
      );
    }
  }
}
