import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  fecha: string
  ;

}
//Respuesta getOrdenes

export interface OrdenResponse {
  page: number;
  limit: number;
  total: number;
  data: Orden[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders'; // URL del backend para órdenes

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
  
  deleteOrden(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  
  updateOrden(producto: Orden): Observable<Orden> {
    const url = `${this.apiUrl}/${producto.id}`;
    return this.http.put<Orden>(url, producto);
  }
}
