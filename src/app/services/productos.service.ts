import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion: string;
  insumos: InsumoProducto[];
}

export interface InsumoProducto {
  insumoId: number;
  cantidad: number;
}
//Respuesta getProductos

export interface ProductoResponse {
  page: number;
  limit: number;
  total: number;
  data: Producto[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}

  getProductosPaginado(page: number, limit: number): Observable<any> {
    const url = `${this.apiUrl}/paginado?page=${page}&limit=${limit}`;
    return this.http.get<any>(url);
  }
  addProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }
  
  deleteProducto(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  
  updateProducto(producto: Producto): Observable<Producto> {
    const url = `${this.apiUrl}/${producto.id}`;
    return this.http.put<Producto>(url, producto);
  }

  addInsumoToProducto(productoId: number, insumoProducto: { insumoId: number, cantidad: number }): Observable<void> {
    const url = `${this.apiUrl}/${productoId}/insumos`;
    return this.http.post<void>(url, insumoProducto);
  }

  removeInsumoFromProducto(productoId: number, insumoId: number): Observable<void> {
    const url = `${this.apiUrl}/${productoId}/insumos/${insumoId}`;
    return this.http.delete<void>(url);
  }
}
