import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss']
})
export class DatosPersonalesComponent implements OnInit {
  usuario: any;
  cambiandoPassword: boolean = false;

  // Datos de la nueva contraseña
  oldPassword!: string;
  newPassword!: string;
  confirmNewPassword!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.authService.getUserById(user.id).subscribe(
      (usuario: any) => {
        this.usuario = usuario;
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
  }

  guardarCambios(): void {
    this.authService.updateUser(this.usuario).subscribe(
      () => {
        this.snackBar.open('Datos personales actualizados', 'Cerrar', { duration: 3000 });
      },
      (error) => {
        console.error('Error al actualizar datos personales:', error);
        this.snackBar.open('Error al actualizar datos personales', 'Cerrar', { duration: 3000 });
      }
    );
  }

  cambiarPassword(): void {
    if (!this.oldPassword || !this.newPassword || !this.confirmNewPassword) {
      this.snackBar.open('Todos los campos son obligatorios', 'Cerrar', { duration: 3000 });
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      this.snackBar.open('Las contraseñas nuevas no coinciden', 'Cerrar', { duration: 3000 });
      return;
    }

    this.authService.changePassword(this.usuario.id, this.oldPassword, this.newPassword).subscribe(
      () => {
        this.snackBar.open('Contraseña cambiada exitosamente', 'Cerrar', { duration: 3000 });
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmNewPassword = '';
        this.cambiandoPassword = false;
      },
      (error) => {
        console.error('Error al cambiar contraseña:', error);
        this.snackBar.open('Error al cambiar contraseña', 'Cerrar', { duration: 3000 });
      }
    );
  }

  irMisOrdenes(): void {
    this.router.navigate(['/perfil']);
  }
}
