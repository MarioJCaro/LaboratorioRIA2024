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

    const isoDate = new Date().toISOString();
  const formattedDate = this.formatDate(isoDate);

    const order = {
      id: 0,
      userId,
      nombre: this.nombre,
      apellido: this.apellido,
      celular: this.celular,
      productos: cartItems.map(item => ({
        productId: item.productId,
        cantidad: item.cantidad
      })),
      estado: 'pendiente',
      fecha: formattedDate
    };
    console.log('Orden:', order);

    this.orderService.addOrden(order).subscribe(() => {
      this.cartService.clearCart(userId);
      console.log('Orden creada con éxito');
      this.router.navigate(['/order-success']);
    });
  }
  formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
}
