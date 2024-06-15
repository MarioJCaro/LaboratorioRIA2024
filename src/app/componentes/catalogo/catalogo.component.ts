import { Component, OnInit } from '@angular/core';
import { Producto, ProductosService, ProductoResponse } from '../../services/productos.service';
import { PageEvent } from '@angular/material/paginator';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
  productos: Producto[] = [];
  totalProductos: number = 0;
  pageSize: number = 10;
  carrito: Producto[] = [];  // Nueva propiedad para el carrito
  constructor(private productosService: ProductosService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        this.pageSize = 5;
      } else if (result.breakpoints[Breakpoints.Small]) {
        this.pageSize = 6;
      } else if (result.breakpoints[Breakpoints.Medium]) {
        this.pageSize = 8;
      } else if (result.breakpoints[Breakpoints.Large]) {
        this.pageSize = 10;
      } else if (result.breakpoints[Breakpoints.XLarge]) {
        this.pageSize = 15;
      }
      this.cargarPagina({ pageIndex: 0, pageSize: this.pageSize, length: this.totalProductos});
    });
  }

  cargarPagina(event: PageEvent): void {
    this.productosService.getProductosPaginado(event.pageIndex + 1, event.pageSize).subscribe(
      (response: ProductoResponse) => {
        this.productos = response.data;
        this.totalProductos = response.total;
      },
      (error) => {
        console.error('Error al obtener productos', error);
      }
    );
  }
  agregarAlCarrito(producto: Producto): void {
    this.carrito.push(producto);
    console.log('Producto añadido al carrito:', producto);
  }
}
