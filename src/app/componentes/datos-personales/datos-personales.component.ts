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
    //obtengo de la local storage el usuario
    const user = JSON.parse(localStorage.getItem('user') || '{}');


    this.authService.getUserById(user.id).subscribe(
      (usuario: any) => {
        this.usuario = usuario;
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
        // Manejo de errores, como redireccionar a una página de error o mostrar un mensaje al usuario
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
    console.log(this.usuario.id, this.oldPassword, this.newPassword);

    this.authService.changePassword(this.usuario.id, this.oldPassword, this.newPassword).subscribe(
      () => {
        this.snackBar.open('Contraseña cambiada exitosamente', 'Cerrar', { duration: 3000 });
        // Limpiar campos de contraseña
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmNewPassword = '';
      },
      (error) => {
        console.error('Error al cambiar contraseña:', error);
        // Manejo de errores, como mostrar un mensaje de error al usuario
        this.snackBar.open('Error al cambiar contraseña', 'Cerrar', { duration: 3000 });
      }
    );
  }

  irMisOrdenes(): void {
    this.router.navigate(['/perfil']);
  }
}
