import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Insumo {
  id: number;
  nombre: string;
  costo: number;
  unidad: string;
}

@Injectable({
  providedIn: 'root'
})
export class InsumosService {

  private apiUrl = 'http://localhost:3000/insumos';

  constructor(private http: HttpClient) { }

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