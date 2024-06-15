import { Component, OnInit } from '@angular/core';
import { Producto, ProductosService } from '../../services/productos.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  carrito: Producto[] = [];

  constructor(private cartService: CartService, private productosService: ProductosService) { }

  ngOnInit(): void {
    // this.cartService.carrito$.subscribe(productos => {
    //   this.carrito = productos;
    // });

    //Hago un get productos
    this.productosService.getProductos().subscribe(productos => {
      console.log(productos);
      this.carrito = productos;
    });


  }

  removeFromCart(producto: Producto): void {
    this.cartService.removeFromCart(producto);
  }
}
