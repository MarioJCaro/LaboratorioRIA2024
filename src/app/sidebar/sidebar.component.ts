import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isAdmin = false;
  isPanadero = false;
  isUser = false;
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    // Suscribirse al observable de autenticación
    this.authService.loggedIn.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        const user = this.authService.getCurrentUser();
        if (user) {
          this.isLoggedIn = true;
          if (user.role === 'ADMIN') {
            this.isAdmin = true;
          } else if (user.role === 'PANADERO') {
            this.isPanadero = true;
          } else if (user.role === 'USER') {
            this.isUser = true;
          }
        }
      } else {
        // Si no hay usuario logueado, reiniciamos las variables
        this.isLoggedIn = false;
        this.isAdmin = false;
        this.isPanadero = false;
        this.isUser = false;
      }
    });
  }

  logout(): void {
    this.isAdmin = false;
    this.isPanadero = false;
    this.isUser = false;
    this.isLoggedIn = false;
    this.authService.logout();
    this.snackBar.open('Sesión cerrada', 'Cerrar', {
      duration: 3000,
    });
    this.router.navigate(['/login']);
  }

}
