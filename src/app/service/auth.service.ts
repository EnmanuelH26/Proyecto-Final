import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://uasdapi.ia3x.com/login'; // Actualiza aquí

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const payload = { username, password };
    return this.http.post<any>(this.apiUrl, payload, {headers});
  }
  // login(username: string, password: string): Observable<any> {
  //   // Simula la validación de credenciales
  //   if (username === '20222086' && password === '20222086@') {
  //     // Simula una respuesta exitosa de la API
  //     return of({
  //       success: true,
  //       message: 'Login successful',
  //       data: {
  //         id: 0,
  //         nombre: 'Enmanuel',
  //         apellido: 'Hernandez Bautista',
  //         username: '20222086',
  //         email: '20222086@itla.edu.do',
  //         authToken: 'simulated-jwt-token',
  //       },
  //       error: null,
  //     });
  //   } else {
  //     // Simula una respuesta fallida
  //     return of({
  //       success: false,
  //       message: 'Usuario o contraseña incorrectos.',
  //       error: null,
  //     });
  //   }
  // }

  recoverPassword(email: string): Observable<any> {
    // Simula la respuesta o realiza la solicitud real si existe un endpoint
    return of({
      success: true,
      message: `Se ha enviado un correo de recuperación a ${email}`,
    });
  }
  
}
