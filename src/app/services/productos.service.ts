import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
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
