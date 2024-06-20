import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

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
    return this.http.get<{ userId: number; productos: CartItem[] }>(`${this.apiUrl}/${userId}`).pipe(
      tap(response => {
        this.carritoSubject.next(response.productos);
      })
    );
  }

  addToCart(userId: number, productId: number, cantidad: number): void {
    this.http.post<{ userId: number; productos: CartItem[] }>(`${this.apiUrl}/${userId}`, { productId, cantidad }).subscribe((response) => {
      this.carritoSubject.next(response.productos);
    });
  }

  updateCart(userId: number, productId: number, cantidad: number): Observable<any> {
    return this.http.put<{ userId: number; productos: CartItem[] }>(`${this.apiUrl}/${userId}`, { productId, cantidad }).pipe(
      tap(response => {
        this.carritoSubject.next(response.productos);
      })
    );
  }

  removeFromCart(userId: number, productId: number): Observable<{ userId: number; productos: CartItem[] }> {
    return this.http.delete<{ userId: number; productos: CartItem[] }>(`${this.apiUrl}/${userId}/${productId}`).pipe(
      tap(response => {
        this.carritoSubject.next(response.productos);
      })
    );
  }

  clearCart(userId: number): void {
    this.http.delete(`${this.apiUrl}/${userId}`).subscribe(() => {
      this.carritoSubject.next([]);
    });
  }

  getCurrentCartItems(): CartItem[] {
    return this.carritoSubject.value;
  }
}
