import { Component, OnInit } from '@angular/core';
import { InsumosService, Insumo } from '../../services/insumos.service';
import { MatDialog } from '@angular/material/dialog';
import { AddInsumoDialogComponent } from '../../dialogs/add-insumo-dialog/add-insumo-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.scss']
})
export class InsumosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'costo', 'unidad', 'acciones'];
  dataSource: Insumo[] = [];

  constructor(private insumosService: InsumosService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.insumosService.getInsumos().subscribe(data => {
      this.dataSource = data;
    });
  }
  openAddInsumoDialog(): void {
    const dialogRef = this.dialog.open(AddInsumoDialogComponent, {
      width: '400px',
      data: { insumo: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addInsumo(result);
      }
    });
  }

  addInsumo(insumo: Insumo): void {
    this.insumosService.addInsumo(insumo).subscribe(newInsumo => {
      this.dataSource.push(newInsumo);
      this.dataSource = [...this.dataSource]; // Refresh the table data
    });
  }
  
  confirmDelete(insumo: Insumo): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteInsumo(insumo);
      }
    });
  }

  deleteInsumo(insumo: Insumo): void {
    this.insumosService.deleteInsumo(insumo.id).subscribe(() => {
      this.dataSource = this.dataSource.filter(p => p.id !== insumo.id);
    });
  }
  editInsumo(insumo: Insumo): void {
    const dialogRef = this.dialog.open(AddInsumoDialogComponent, {
      width: '400px',
      data: { insumo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateInsumo(result);
      }
    });
  }

  updateInsumo(insumo: Insumo): void {
    this.insumosService.updateInsumo(insumo).subscribe(updatedInsumo => {
      const index = this.dataSource.findIndex(p => p.id === updatedInsumo.id);
      if (index !== -1) {
        this.dataSource[index] = updatedInsumo;
        this.dataSource = [...this.dataSource]; // Refresh the table data
      }
    });
  }
}
