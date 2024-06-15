import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  isAdmin = false;
  isPanadero = false;
  isUser = false;
  isLoggedIn = false;
  opened = false;
  private authSubscription!: Subscription;

  @ViewChild('cartSidenav') cartSidenav!: MatSidenav;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.loggedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      this.updateUserRole();
    });

    this.updateUserRole();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  updateUserRole(): void {
    const user = this.authService.getCurrentUser();
    this.isAdmin = false;
    this.isPanadero = false;
    this.isUser = false;

    if (user) {
      if (user.role === 'ADMIN') {
        this.isLoggedIn = true;
        this.isAdmin = true;
      } else if (user.role === 'PANADERO') {
        this.isLoggedIn = true;
        this.isPanadero = true;
      } else if (user.role === 'USER') {
        this.isLoggedIn = true;
        this.isUser = true;
      }
    }
  }

  logout(): void {
    this.authService.logout();
    this.snackBar.open('Sesión cerrada', 'Cerrar', {
      duration: 3000,
    });
    this.router.navigate(['/login']);
    this.opened = false;
  }

  navigateToCart(): void {
    this.router.navigate(['/carrito']); // Ruta a la vista del carrito
  }
}