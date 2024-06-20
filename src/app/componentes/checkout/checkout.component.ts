import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  nombre: string = '';
  apellido: string = '';
  celular: string = '';

  constructor(private cartService: CartService, private orderService: OrderService, private router: Router) { }

  confirmarCompra(): void {
    const userId = JSON.parse(localStorage.getItem('user') ?? '{}').id;
    const cartItems = this.cartService.getCurrentCartItems();

    if (!Array.isArray(cartItems)) {
      console.error('Cart items are not an array:', cartItems);
      return;
    }

    const order = {
      userId,
      nombre: this.nombre,
      apellido: this.apellido,
      celular: this.celular,
      productos: cartItems.map(item => ({
        productId: item.productId,
        cantidad: item.cantidad
      }))
    };

    this.orderService.createOrder(order).subscribe(() => {
      this.cartService.clearCart(userId);
      console.log('Orden creada con éxito');
      this.router.navigate(['/order-success']);
    });
  }
}
