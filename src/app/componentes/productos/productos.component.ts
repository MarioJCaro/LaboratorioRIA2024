import { Component, OnInit } from '@angular/core';
import { ProductosService, Producto } from '../../services/productos.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from '../../dialogs/add-product-dialog/add-product-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { ViewInsumosDialogComponent } from '../../dialogs/view-insumos-dialog/view-insumos-dialog.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'imagen','descripcion','insumos', 'acciones'];
  dataSource: Producto[] = [];

  constructor(private productosService: ProductosService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.productosService.getProductos().subscribe(data => {
      this.dataSource = data;
    });
  }
  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '400px',
      data: { producto: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addProduct(result);
      }
    });
  }

  addProduct(producto: Producto): void {
    this.productosService.addProducto(producto).subscribe(newProduct => {
      this.dataSource.push(newProduct);
      this.dataSource = [...this.dataSource]; // Refresh the table data
    });
  }
  
  confirmDelete(producto: Producto): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(producto);
      }
    });
  }

  deleteProduct(producto: Producto): void {
    this.productosService.deleteProducto(producto.id).subscribe(() => {
      this.dataSource = this.dataSource.filter(p => p.id !== producto.id);
    });
  }
  editProduct(producto: Producto): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '400px',
      data: { producto }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateProduct(result);
      }
    });
  }

  updateProduct(producto: Producto): void {
    this.productosService.updateProducto(producto).subscribe(updatedProduct => {
      const index = this.dataSource.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) {
        this.dataSource[index] = updatedProduct;
        this.dataSource = [...this.dataSource]; // Refresh the table data
      }
    });
  }

  openViewInsumosDialog(producto: Producto): void {
    const dialogRef = this.dialog.open(ViewInsumosDialogComponent, {
      width: '600px',
      data: { producto }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateProduct(producto); // Actualiza el producto para guardar los insumos añadidos
      }
    });
  }  
}
