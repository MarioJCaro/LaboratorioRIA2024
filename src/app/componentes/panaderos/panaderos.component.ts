import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { AuthService } from '../../services/auth.service';
import { AddPanaderoDialogComponent } from '../../dialogs/add-panadero-dialog/add-panadero-dialog.component';

@Component({
  selector: 'app-panaderos',
  templateUrl: './panaderos.component.html',
  styleUrl: './panaderos.component.scss'
})
export class PanaderosComponent {

  displayedColumns: string[] = ['id', 'email', 'celular', 'acciones'];
  dataSource: any[] = [];


  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadPanaderos();
  }
  loadPanaderos(): void {
    this.authService.getPanaderos().subscribe(data => {
      this.dataSource = data;
    });
  }
  openAddPanaderoDialog(): void {
    const dialogRef = this.dialog.open(AddPanaderoDialogComponent, {
      width: '400px',
      data: { panadero: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addPanadero(result);
      }
    });
  }

  addPanadero(panadero: any): void {
    this.authService.createPanadero(panadero).subscribe(newPanadero => {
      this.dataSource.push(newPanadero);
      this.dataSource = [...this.dataSource];
    });
  }

  confirmDelete(panadero: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePanadero(panadero);
      }
    });
  }

  deletePanadero(panadero: any): void {
    this.authService.deletePanadero(panadero.id).subscribe(() => {
      this.dataSource = this.dataSource.filter(p => p.id !== panadero.id);
    });
  }
  editPanadero(panadero: any): void {
    const dialogRef = this.dialog.open(AddPanaderoDialogComponent, {
      width: '400px',
      data: { panadero }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updatePanadero(result);
      }
    });
  }

  updatePanadero(panadero: any): void {
    this.authService.updatePanadero(panadero).subscribe(updatedInsumo => {
      this.loadPanaderos();
    });
  }

}
