import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './productos.service';

export interface Orden {
  id: number;
  userId: number;
  nombre: string;
  apellido: string;
  celular: string;
  productos: {
    productId: number;
    cantidad: number;
  }[],
  estado: string;
  fecha: string;
}

export interface Estado {
  id: number;
  nombre: string;
}
//Respuesta getOrdenes

export interface OrdenResponse {
  page: number;
  limit: number;
  total: number;
  data: Orden[];
}

export interface ProductoConCantidad {
  producto: Producto;
  cantidad: number;
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders'; // URL del backend para órdenes
  private estados: Estado[] = [
    { id: 1, nombre: 'Pendiente' },
    { id: 2, nombre: 'En preparación' },
    { id: 3, nombre: 'Listo para recoger' },
    { id: 4, nombre: 'Entregado' }
  ];

  constructor(private http: HttpClient) {}

  getOrdenesPaginado(page: number, limit: number, filterField?: string, filterValue?: string, sortField?: string, sortDirection?: string): Observable<OrdenResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (filterField && filterValue) {
      params = params.set('filterField', filterField).set('filterValue', filterValue);
    }

    if (sortField && sortDirection) {
      params = params.set('sortField', sortField).set('sortDirection', sortDirection);
    }

    return this.http.get<OrdenResponse>(`${this.apiUrl}/paginado`, { params });
  }
  
  getOrdenes(): Observable<Orden[]> {
    return this.http.get<Orden[]>(this.apiUrl);
  }
  
  getOrden(id: number): Observable<Orden> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Orden>(url);
  }

  addOrden(producto: Orden): Observable<Orden> {
    return this.http.post<Orden>(this.apiUrl, producto);
  }
  getEstados(): Estado[] {
    return this.estados;
  }
  deleteOrden(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  
  updateOrden(producto: Orden): Observable<Orden> {
    const url = `${this.apiUrl}/${producto.id}`;
    return this.http.put<Orden>(url, producto);
  }
  updateOrderEstado(id: number, estado: string): Observable<Orden> {
    return this.http.patch<Orden>(`${this.apiUrl}/${id}/estado`, { estado });
  }
}
