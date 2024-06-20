import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Insumo {
  id: number;
  nombre: string;
  costo: number;
  unidad: string;
}

export interface InsumoResponse {
  page: number;
  limit: number;
  total: number;
  data: Insumo[];
}

@Injectable({
  providedIn: 'root'
})
export class InsumosService {

  private apiUrl = 'http://localhost:3000/insumos';

  constructor(private http: HttpClient) { }

  getInsumosPaginado(page: number, limit: number, filterField?: string, filterValue?: string, sortField?: string, sortDirection?: string): Observable<InsumoResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (filterField && filterValue) {
      params = params.set('filterField', filterField).set('filterValue', filterValue);
    }

    if (sortField && sortDirection) {
      params = params.set('sortField', sortField).set('sortDirection', sortDirection);
    }

    return this.http.get<InsumoResponse>(`${this.apiUrl}/paginado`, { params });
  }

  getInsumos(): Observable<Insumo[]> {
    return this.http.get<Insumo[]>(this.apiUrl);
  }
  
  addInsumo(insumo: Insumo): Observable<Insumo> {
    return this.http.post<Insumo>(this.apiUrl, insumo);
  }
  
  deleteInsumo(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  
  updateInsumo(insumo: Insumo): Observable<Insumo> {
    const url = `${this.apiUrl}/${insumo.id}`;
    return this.http.put<Insumo>(url, insumo);
  }
  
  getInsumo(id: number): Observable<Insumo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Insumo>(url);
  }  
}