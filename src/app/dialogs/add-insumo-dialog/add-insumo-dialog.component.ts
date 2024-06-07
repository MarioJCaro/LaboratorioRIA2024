import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Insumo } from '../../services/insumos.service';

@Component({
  selector: 'app-add-insumo-dialog',
  templateUrl: './add-insumo-dialog.component.html',
  styleUrls: ['./add-insumo-dialog.component.scss']
})
export class AddInsumoDialogComponent {

  insumo: Insumo;

  constructor(
    public dialogRef: MatDialogRef<AddInsumoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data && data.insumo) {
        this.insumo = {...data.insumo};
      } else {
        this.insumo = {
          id: 0,
          nombre: '',
          costo: 0,
          unidad: ''
        };
      }
    }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.insumo);
  }
}
