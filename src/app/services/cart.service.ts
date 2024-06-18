import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from './productos.service';

interface CartItem {
  productId: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/carrito'; // URL del backend para el carrito
  private carritoSubject = new BehaviorSubject<CartItem[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCart(userId: number): Observable<{ userId: number; productos: CartItem[] }> {
    return this.http.get<{ userId: number; productos: CartItem[] }>(`${this.apiUrl}/${userId}`);
  }

  addToCart(userId: number, productId: number, cantidad: number): void {
    this.http.post<CartItem[]>(`${this.apiUrl}/${userId}`, { productId, cantidad }).subscribe((carrito: CartItem[]) => {
      this.carritoSubject.next(carrito);
    });
  }

  updateCart(userId: number, productId: number, cantidad: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, { productId, cantidad });
  }

  removeFromCart(userId: number, productId: number): Observable<CartItem[]> {
    return this.http.delete<CartItem[]>(`${this.apiUrl}/${userId}/${productId}`);
  }

  clearCart(userId: number): void {
    this.http.delete(`${this.apiUrl}/${userId}`).subscribe(() => {
      this.carritoSubject.next([]);
    });
  }
}
