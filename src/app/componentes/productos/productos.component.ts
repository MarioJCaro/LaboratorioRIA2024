// productos.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductosService, Producto } from '../../services/productos.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from '../../dialogs/add-product-dialog/add-product-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { ViewInsumosDialogComponent } from '../../dialogs/view-insumos-dialog/view-insumos-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'imagen', 'descripcion', 'insumos', 'acciones'];
  mobileColumns: string[] = ['id', 'nombre', 'insumos', 'acciones'];
  dataSource: Producto[] = [];
  page = 1;
  limit = 10;
  total = 0;
  filterField = 'nombre';
  filterValue = '';
  sortField = 'id';
  sortDirection = 'asc';
  isMobile: boolean = false;

  constructor(
    private productosService: ProductosService,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.loadProductos();

    this.breakpointObserver.observe([Breakpoints.XSmall ,Breakpoints.Small])
      .subscribe(result => {
        this.isMobile = result.matches;
        this.setDisplayedColumns();
      });
  }

  setDisplayedColumns(): void {
    this.displayedColumns = this.isMobile ? this.mobileColumns : ['id', 'nombre', 'precio', 'imagen', 'descripcion', 'insumos', 'acciones'];
  }

  loadProductos(): void {
    this.productosService.getProductosPaginado(this.page, this.limit, this.filterField, this.filterValue, this.sortField, this.sortDirection).subscribe(data => {
      this.dataSource = data.data;
      this.total = data.total;
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
      this.page = 1; // Redirigir a la primera página después de agregar un producto
      this.loadProductos();
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
      this.page = 1; // Redirigir a la primera página después de eliminar un producto
      this.loadProductos();
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
      this.loadProductos();
    });
  }

  viewInsumos(producto: Producto): void {
    const dialogRef = this.dialog.open(ViewInsumosDialogComponent, {
      width: '50%',
      data: { producto }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadProductos();
    });
  }

  changePage(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.loadProductos();
  }

  onFilterChange(): void {
    this.page = 1; // Reiniciar a la primera página cuando se aplica un filtro
    this.loadProductos();
  }

  setSort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.loadProductos();
  }
}
