import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://api-uasd.edu.do'; // Cambia esto por tu URL base
  private tokenKey = 'auth_token'; // Clave para guardar el token

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión y obtener el token
  login(username: string, password: string): Observable<any> {
    const payload = { username, password };
    return this.http.post(`${this.apiUrl}/login`, payload);
  }

  // Método para guardar el token
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Método para obtener el token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Método para eliminar el token (por ejemplo, al cerrar sesión)
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
