import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from '../../services/productos.service';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent {

  producto: Producto;

  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data && data.producto) {
        this.producto = {...data.producto};
      } else {
        this.producto = {
          id: 0,
          nombre: '',
          precio: 0,
          descripcion: '',
          imagen: '',
          insumos: []
        };
      }
    }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.producto);
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.producto.imagen = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
