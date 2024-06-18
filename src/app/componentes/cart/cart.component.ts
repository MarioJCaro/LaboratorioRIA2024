import { Component, OnInit } from '@angular/core';
import { Producto, ProductosService } from '../../services/productos.service';
import { CartService } from '../../services/cart.service';

interface CartItem {
  productId: number;
  cantidad: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  carrito: { producto: Producto, cantidad: number }[] = [];

  constructor(private cartService: CartService, private productosService: ProductosService) { }

  ngOnInit(): void {
    const userId = JSON.parse(localStorage.getItem('user') ?? '{}').id;
    this.cartService.getCart(userId).subscribe(response => {
      const items: CartItem[] = response.productos; // Accedemos a la propiedad 'productos'
      if (items.length === 0) {
        console.log('No hay items en el carrito');
        // Puedes mostrar un mensaje en el frontend si lo deseas
      } else {
        items.forEach(item => {
          this.productosService.getProducto(item.productId).subscribe(producto => {
            this.carrito.push({ producto, cantidad: item.cantidad });
          });
        });
      }
    });
  }

  incrementarCantidad(productId: number): void {
    const userId = JSON.parse(localStorage.getItem('user') ?? '{}').id;
    const item = this.carrito.find(item => item.producto.id === productId);
    if (item) {
      item.cantidad += 1;
      this.cartService.updateCart(userId, productId, item.cantidad).subscribe();
    }
  }

  decrementarCantidad(productId: number): void {
    const userId = JSON.parse(localStorage.getItem('user') ?? '{}').id;
    const item = this.carrito.find(item => item.producto.id === productId);
    if (item && item.cantidad > 1) {
      item.cantidad -= 1;
      this.cartService.updateCart(userId, productId, item.cantidad).subscribe();
    }
  }
  getTotal(): number {
    return this.carrito.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);
  }

  eliminarDelCarrito(productId: number): void {
    const userId = JSON.parse(localStorage.getItem('user') ?? '{}').id;
    this.cartService.removeFromCart(userId, productId).subscribe(() => {
      this.carrito = this.carrito.filter(item => item.producto.id !== productId);
    });
  }
}
