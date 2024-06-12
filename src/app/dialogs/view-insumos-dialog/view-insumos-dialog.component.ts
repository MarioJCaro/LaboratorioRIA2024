import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InsumosService, Insumo } from '../../services/insumos.service';
import { Producto, ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-view-insumos-dialog',
  templateUrl: './view-insumos-dialog.component.html',
  styleUrls: ['./view-insumos-dialog.component.scss']
})
export class ViewInsumosDialogComponent implements OnInit {
  insumos: { insumo: Insumo, cantidad: number }[] = [];

  availableInsumos: Insumo[] = [];
  newInsumoId: number | null = null;
  newCantidad: number = 1;
  showAddInsumo = false;
  constructor(
    public dialogRef: MatDialogRef<ViewInsumosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { producto: Producto },
    private insumosService: InsumosService,
    private productosService: ProductosService
  ) { }

  ngOnInit(): void {
    this.loadInsumos();
    this.loadAvailableInsumos();
  }

  loadInsumos(): void {
    const insumoRequests = this.data.producto.insumos.map(insumoData =>
      this.insumosService.getInsumo(insumoData.insumoId).toPromise()
        .then(insumo => insumo ? { insumo, cantidad: insumoData.cantidad } : undefined)
    );

    Promise.all(insumoRequests).then(insumos => {
      // Filtrar los valores undefined
      this.insumos = insumos.filter((insumo): insumo is { insumo: Insumo, cantidad: number } => insumo !== undefined);
    });
  }

  loadAvailableInsumos(): void {
    this.insumosService.getInsumos().subscribe(allInsumos => {
      const currentInsumoIds = this.insumos.map(i => i.insumo.id);
      this.availableInsumos = allInsumos.filter(insumo => !currentInsumoIds.includes(insumo.id));
      console.log(this.availableInsumos);
    });
  }

  addNewInsumo(): void {
    if (this.newInsumoId !== null) {
      const selectedInsumo = this.availableInsumos.find(insumo => insumo.id === this.newInsumoId);
      if (selectedInsumo) {
        this.productosService.addInsumoToProducto(this.data.producto.id, { insumoId: this.newInsumoId, cantidad: this.newCantidad })
          .subscribe(() => {
            this.insumos.push({ insumo: selectedInsumo, cantidad: this.newCantidad });
            this.newInsumoId = null;
            this.newCantidad = 1;
            this.showAddInsumo = false;
            this.loadAvailableInsumos(); 
            this.insumos = [...this.insumos];
          });
      }
    }
  }
  removeInsumo(element: { insumo: Insumo, cantidad: number }): void {
    this.productosService.removeInsumoFromProducto(this.data.producto.id, element.insumo.id)
      .subscribe(() => {
        this.insumos = this.insumos.filter(i => i.insumo.id !== element.insumo.id);
        this.loadAvailableInsumos();
      });
  }

  toggleAddInsumo(): void {
    this.showAddInsumo = !this.showAddInsumo;
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
