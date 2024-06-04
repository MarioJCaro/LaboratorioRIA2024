import { Component, OnInit } from '@angular/core';
import { ProductosService, Producto } from '../../services/productos.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from '../../dialogs/add-product-dialog/add-product-dialog.component';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'imagen','descripcion', 'acciones'];
  dataSource: Producto[] = [];

  constructor(private productosService: ProductosService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.productosService.getProductos().subscribe(data => {
      this.dataSource = data;
    });
  }
  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '400px'
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
}
