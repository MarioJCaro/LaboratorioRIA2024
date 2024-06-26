import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  userId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      if (this.resetPasswordForm.value.newPassword !== this.resetPasswordForm.value.confirmNewPassword) {
        this.snackBar.open('Las contraseñas no coinciden', 'Cerrar', {
          duration: 3000,
        });
        return;
      }

      this.authService.resetPassword(this.userId, this.resetPasswordForm.value.newPassword).subscribe(
        () => {
          this.snackBar.open('Contraseña restablecida correctamente', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/login']);
        },
        error => {
          this.snackBar.open('Error al restablecer contraseña', 'Cerrar', {
            duration: 3000,
          });
        }
      );
    }
  }
}
