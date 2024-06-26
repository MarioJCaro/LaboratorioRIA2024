import { Component, OnInit } from '@angular/core';
import { Producto, ProductosService, ProductoResponse } from '../../services/productos.service';
import { CartService } from '../../services/cart.service'; // Importar el servicio del carrito
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
  selectedQuantity: number[] = []; // Array para almacenar la cantidad seleccionada por producto

  constructor(
    private productosService: ProductosService,
    private cartService: CartService, // Inyectar el servicio del carrito
    private breakpointObserver: BreakpointObserver
  ) { }

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
      this.cargarPagina({ pageIndex: 0, pageSize: this.pageSize, length: this.totalProductos });
    });
  }

  cargarPagina(event: PageEvent): void {
    this.productosService.getProductosPaginado(event.pageIndex + 1, event.pageSize).subscribe(
      (response: ProductoResponse) => {
        this.productos = response.data;
        this.totalProductos = response.total;
        this.selectedQuantity = new Array(this.productos.length).fill(1); 
      },
      (error) => {
        console.error('Error al obtener productos', error);
      }
    );
  }

  agregarAlCarrito(producto: Producto, index: number): void {
    const userId = JSON.parse(localStorage.getItem('user') ?? '{}').id;
    console.log('Usuario actual:', userId);
    const cantidad = this.selectedQuantity[index];
    this.cartService.addToCart(userId, producto.id, cantidad);
    console.log('Producto añadido al carrito:', producto, 'Cantidad:', cantidad);
  }

  validarEntrada(event: KeyboardEvent): void {
    const pattern = /[0-9]/; // Expresión regular para permitir solo números
    const inputChar = event.key;

    if (!pattern.test(inputChar)) {
      event.preventDefault(); // Cancelar la pulsación de tecla si no es un número
    }
  }
}
