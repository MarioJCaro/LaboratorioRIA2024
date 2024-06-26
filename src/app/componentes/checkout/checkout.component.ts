import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  nombre: string = '';
  apellido: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.checkoutForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      celular: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]]
    });
  }

  get formControls() {
    return this.checkoutForm.controls;
  }

  confirmarCompra(): void {
    const userId = JSON.parse(localStorage.getItem('user') ?? '{}').id;
    const cartItems = this.cartService.getCurrentCartItems();

    if (cartItems.length === 0) {
      this.snackBar.open('El carrito está vacío', 'Cerrar', { duration: 3000 });
      return;
    }

    const isoDate = new Date().toISOString();
    const formattedDate = this.formatDate(isoDate);

    console
    const order = {
      id: 0,
      userId,
      nombre: this.checkoutForm.get('nombre')?.value, // Acceder al valor de nombre usando get('nombre')
      apellido: this.checkoutForm.get('apellido')?.value, // Acceder al valor de apellido usando get('apellido')
      celular: this.checkoutForm.get('celular')?.value, // Acceder al valor de celular usando get('celular')
      productos: cartItems.map(item => ({
        productId: item.productId,
        cantidad: item.cantidad
      })),
      estado: 'Pendiente',
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
