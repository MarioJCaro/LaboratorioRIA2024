import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';

//Interfaz respuesta del login
export interface LoginResponse {
  id: number;
  token: string;
  nombre: string;
  role: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/usuarios';
  private loggedInSubject = new BehaviorSubject<boolean>(false); // Observable para el estado de inicio de sesión
  public loggedIn = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) { }

 login(credentials: { email: string, password: string }): Observable<boolean> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      map(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({ id:response.id ,email: response.nombre, role: response.role }));
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
    this.loggedInSubject.next(false); 
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');

  }
}
