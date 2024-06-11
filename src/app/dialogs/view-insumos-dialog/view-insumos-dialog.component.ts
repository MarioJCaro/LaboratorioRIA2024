import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InsumosService, Insumo } from '../../services/insumos.service';
import { Producto, InsumoProducto, ProductosService } from '../../services/productos.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-view-insumos-dialog',
  templateUrl: './view-insumos-dialog.component.html',
  styleUrls: ['./view-insumos-dialog.component.scss']
})
export class ViewInsumosDialogComponent implements OnInit {
  insumos: { nombre: string, unidad: string, cantidad: number }[] = [];
  allInsumos: Insumo[] = [];
  filteredInsumos: Insumo[] = [];
  newInsumoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ViewInsumosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { producto: Producto },
    private insumosService: InsumosService,
    private productosService: ProductosService,
    private fb: FormBuilder
  ) {
    this.newInsumoForm = this.fb.group({
      insumo: [null, Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadInsumos();
  }

  loadInsumos(): void {
    this.insumosService.getInsumos().subscribe(allInsumos => {
      this.allInsumos = allInsumos || [];
      const insumoRequests = this.data.producto.insumos.map(insumoProducto =>
        this.insumosService.getInsumo(insumoProducto.insumoId)
      );

      forkJoin(insumoRequests).subscribe(insumos => {
        this.insumos = insumos.map((insumo, index) => ({
          nombre: insumo.nombre,
          unidad: insumo.unidad,
          cantidad: this.data.producto.insumos[index].cantidad
        }));

        this.filteredInsumos = this.allInsumos.filter(
          insumo => !this.data.producto.insumos.some(p => p.insumoId === insumo.id)
        );
      });
    });
  }

  addInsumo(): void {
    if (this.newInsumoForm.valid) {
      const selectedInsumo: Insumo = this.newInsumoForm.value.insumo;
      const cantidad: number = this.newInsumoForm.value.cantidad;

      const newInsumoProducto: InsumoProducto = {
        insumoId: selectedInsumo.id,
        cantidad: cantidad
      };

      this.productosService.addInsumoToProducto(this.data.producto.id, newInsumoProducto).subscribe(() => {
        // Actualizar el producto en el frontend
        this.data.producto.insumos.push(newInsumoProducto);

        // Añadir el insumo al array local
        const insumo = {
          nombre: selectedInsumo.nombre,
          unidad: selectedInsumo.unidad,
          cantidad: cantidad
        };

        this.insumos.push(insumo);
        this.newInsumoForm.reset();

        // Actualizar el filtro de insumos
        this.filteredInsumos = this.filteredInsumos.filter(insumo => insumo.id !== selectedInsumo.id);
      });
    }
  }
}
