import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders'; // URL del backend para órdenes

  constructor(private http: HttpClient) { }

  createOrder(order: any): Observable<any> {
    console.log(order);
    return this.http.post<any>(this.apiUrl, order);
  }
}
