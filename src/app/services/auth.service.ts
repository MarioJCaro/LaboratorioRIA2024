import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';

//Interfaz respuesta del login
export interface LoginResponse {
  id: number;
  token: string;
  nombre: string;
  role: string;
  expirationDate: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/usuarios';
  private loggedInSubject = new BehaviorSubject<boolean>(false); 
  public loggedIn = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) { }

 login(credentials: { email: string, password: string }): Observable<boolean> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      map(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({ id:response.id ,email: response.nombre, role: response.role }));
        localStorage.setItem('tokenExpiration', response.expirationDate)
        this.loggedInSubject.next(true);
        return true;
      }),
      catchError(() => of(false))
    );
  }



  register(data: { email: string, password: string, role: string, telefono: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiration');
    this.loggedInSubject.next(false);
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const isExpired = this.isTokenExpired();
    return !!token && !isExpired;
  }

  isTokenExpired(): boolean {
    const expirationDate = localStorage.getItem('tokenExpiration');
    if (!expirationDate) {
      return true;
    }

    const [day, month, year, hours, minutes, seconds] = expirationDate.split(/[/ :]/);
    const expDate = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
    return expDate.getTime() < new Date().getTime();
  }

  getUserById(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<any>(url);
  }

  // Cambiar contraseña con handle error, en el body se manda id, oldPassword y newPassword
  changePassword(id: number, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/change-password`, { id, oldPassword, newPassword }).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${user.id}`, user).pipe(
      catchError(this.handleError)
    );
  }

  forgotPassword(data: { email: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, data).pipe(
      catchError(this.handleError)
    );
  }

  resetPassword(id: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, { id, newPassword }).pipe(
      catchError(this.handleError)
    );
  }

  createPanadero(data: { email: string, password: string, telefono: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/panaderos`, data).pipe(
      catchError(this.handleError)
    );
  }

  getPanaderos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/panaderos`).pipe(
      catchError(this.handleError)
    );
  }

  updatePanadero(panadero:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/panaderos/${panadero.id}`, panadero).pipe(
      catchError(this.handleError)
    );
  }

  deletePanadero(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/panaderos/${id}`).pipe(
      catchError(this.handleError)
    );
  }

}
