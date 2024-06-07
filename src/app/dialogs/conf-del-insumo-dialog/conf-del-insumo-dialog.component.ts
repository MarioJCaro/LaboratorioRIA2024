import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-conf-del-insumo-dialog',
  templateUrl: './conf-del-insumo-dialog.component.html',
  styleUrls: ['./conf-del-insumo-dialog.component.scss']
})
export class ConfDelInsumoDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfDelInsumoDialogComponent>) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
