// ver-insumos-totales-dialog.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderService, Orden, Estado, ProductoConCantidad } from '../../services/order.service';
import { Producto, ProductosService } from '../../services/productos.service';
import { Insumo, InsumosService } from '../../services/insumos.service';

@Component({
  selector: 'app-ver-insumos-totales-dialog',
  templateUrl: './ver-insumos-totales-dialog.component.html',
  styleUrls: ['./ver-insumos-totales-dialog.component.scss']
})
export class VerInsumosTotalesDialogComponent implements OnInit {
  productos: ProductoConCantidad[] = [];
  allInsumos: Insumo[] = [];
  insumosTotales: { insumo: Insumo, cantidad: number }[] = [];

  constructor(
    public dialogRef: MatDialogRef<VerInsumosTotalesDialogComponent>,
    private orderService: OrderService,
    private productosService: ProductosService,
    private insumosService: InsumosService
  ) {}

  ngOnInit(): void {
    this.loadPendingOrders();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  loadPendingOrders(): void {
    this.orderService.getOrdenes().subscribe((ordenes: Orden[]) => {
      const pendingOrders = ordenes.filter(order => order.estado === 'Pendiente');
      this.loadProductosFromOrders(pendingOrders);
      this.loadAllInsumos();
    });
  }

  loadProductosFromOrders(ordenes: Orden[]): void {
    this.productos = [];
    for (const orden of ordenes) {
      for (const item of orden.productos) {
        this.productosService.getProducto(item.productId).subscribe(producto => {
          const productoConCantidad: ProductoConCantidad = {
            producto: producto,
            cantidad: item.cantidad 
          };
          this.productos.push(productoConCantidad);
          this.calculateTotalInsumos();
        });
      }
    }
  }

  loadAllInsumos(): void {
    this.insumosService.getInsumos().subscribe(insumos => {
      this.allInsumos = insumos;
      this.calculateTotalInsumos();
    });
  }

  calculateTotalInsumos(): void {
    if (this.productos.length > 0 && this.allInsumos.length > 0) {
      const insumosTotales = new Map<number, number>();

      for (const productoConCantidad of this.productos) {
        for (const insumo of productoConCantidad.producto.insumos) {
          const insumoId = insumo.insumoId;
          const cantidad = insumo.cantidad * productoConCantidad.cantidad;

          if (insumosTotales.has(insumoId)) {
            insumosTotales.set(insumoId, insumosTotales.get(insumoId)! + cantidad);
          } else {
            insumosTotales.set(insumoId, cantidad);
          }
        }
      }

      const resultado: { insumo: Insumo, cantidad: number }[] = [];
      insumosTotales.forEach((cantidad, insumoId) => {
        const insumo = this.allInsumos.find(i => i.id === insumoId);
        if (insumo) {
          resultado.push({ insumo: insumo, cantidad: cantidad });
        }
      });

      this.insumosTotales = resultado;
    }
  }
}
