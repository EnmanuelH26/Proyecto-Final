import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  resetData = {
    usuario: '',
    email: '',
  };
  mensajeRespuesta: string = ''; // Para almacenar el mensaje de la API

  constructor(private http: HttpClient) {}

  resetPassword() {
    // Validar los campos antes de enviar
    if (!this.resetData.usuario || !this.resetData.email) {
      this.mensajeRespuesta = 'Por favor, completa todos los campos.';
      return;
    }

    // Llamada a la API
    this.http.post('https://uasdapi.ia3x.com/reset_password', this.resetData).subscribe(
      (response: any) => {
        if (response.success) {
          this.mensajeRespuesta = response.message; 
          console.log(response);
        } else {
          this.mensajeRespuesta = 'Error al solicitar el restablecimiento de contraseña.';
        }
      },
      (error) => {
        console.error('Error en solicitud de restablecimiento:', error);
        this.mensajeRespuesta = 'Error al procesar la solicitud.';
      }
    );
  }
}
