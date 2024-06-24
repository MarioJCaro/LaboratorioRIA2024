import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService, Orden, Estado, ProductoConCantidad } from '../../services/order.service';
import { Producto, ProductosService } from '../../services/productos.service';
import { Insumo, InsumosService } from '../../services/insumos.service';

@Component({
  selector: 'app-detalle-orden-dialog',
  templateUrl: './detalle-orden-dialog.component.html',
  styleUrls: ['./detalle-orden-dialog.component.scss']
})
export class DetalleOrdenDialogComponent {
  estados: Estado[];
  showProductosInsumos: boolean = false;
  productos: ProductoConCantidad[] = [];
  allInsumos: Insumo[] = [];
  mostrarInsumosTotales: boolean = false; // Propiedad para controlar la visualización de insumos totales

  constructor(
    public dialogRef: MatDialogRef<DetalleOrdenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orden: Orden },
    private orderService: OrderService,
    private productosService: ProductosService,
    private insumosService: InsumosService
  ) {
    this.estados = this.orderService.getEstados();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.orderService.updateOrderEstado(this.data.orden.id, this.data.orden.estado).subscribe(() => {
      this.dialogRef.close(this.data.orden);
    });
  }

  toggleProductosInsumos(): void {
    this.showProductosInsumos = !this.showProductosInsumos;
    if (this.showProductosInsumos) {
      this.loadProductos();
      this.loadAllInsumos();
    }
  }

  loadProductos(): void {
    this.productos = [];
    for (const item of this.data.orden.productos) {
      this.productosService.getProducto(item.productId).subscribe(producto => {
        const productoConCantidad: ProductoConCantidad = {
          producto: producto,
          cantidad: item.cantidad 
        };

        this.productos.push(productoConCantidad);
      });
    }
  }
  
  loadAllInsumos(): void {
    this.insumosService.getInsumos().subscribe(insumos => {
      this.allInsumos = insumos;
    });
  }

  getInsumosForProduct(producto: Producto): { insumo: Insumo, cantidad: number }[] {
    const insumos = [];
    for (const insumo of producto.insumos) {
      const insumoData = this.allInsumos.find(i => i.id === insumo.insumoId);
      if (insumoData) {
        insumos.push({ insumo: insumoData, cantidad: insumo.cantidad });
      }
    }
    return insumos;
  }

  // Función para alternar entre mostrar insumos por producto y totales
  alternarVistaInsumos(): void {
    this.mostrarInsumosTotales = !this.mostrarInsumosTotales;
  }

  // Función para obtener los insumos totales de todos los productos
  getTotalInsumos(): { insumo: Insumo, cantidad: number }[] {
    const insumosTotales = new Map<number, number>(); // Usamos un mapa para acumular cantidades por ID de insumo

    // Recorremos todos los productos
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

    // Convertimos el mapa de insumos totales a un array para mostrar en la vista
    const resultado: { insumo: Insumo, cantidad: number }[] = [];
    insumosTotales.forEach((cantidad, insumoId) => {
      const insumo = this.allInsumos.find(i => i.id === insumoId);
      if (insumo) {
        resultado.push({ insumo: insumo, cantidad: cantidad });
      }
    });

    return resultado;
  }
}
