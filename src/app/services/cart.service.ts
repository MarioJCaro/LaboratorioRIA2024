import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from './productos.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private carrito: Producto[] = [];
  private carritoSubject = new BehaviorSubject<Producto[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  addToCart(producto: Producto): void {
    this.carrito.push(producto);
    this.carritoSubject.next(this.carrito);
  }

  removeFromCart(producto: Producto): void {
    this.carrito = this.carrito.filter(item => item.id !== producto.id);
    this.carritoSubject.next(this.carrito);
  }
}
