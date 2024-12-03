import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-deudas',
  templateUrl: './deudas.page.html',
  styleUrls: ['./deudas.page.scss'],
})
export class DeudasPage implements OnInit {
  deuda: any = null;
  error: string | null = null;
  linkPago: string = 'https://pagina-de-pagos.uasd.edu.do';

  constructor(private http: HttpClient, private authService: AuthService) {}

  async ngOnInit() {
    this.cargarDeuda();
  }

  async cargarDeuda() {
    const apiUrl = 'https://uasdapi.ia3x.com/deudas'; // Cambia a tu endpoint real
    const token = await this.authService.getToken(); // Usar el AuthService

    if (!token) {
      this.error = 'El usuario no está autenticado.';
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    try {
      const response: any = await this.http.get(apiUrl, { headers }).toPromise();

      if (response && response.length > 0) {
        this.deuda = response[0]; // Asignar la primera deuda (siempre que haya una)
      } else {
        this.error = 'No se encontró información de deuda.';
      }
    } catch (err) {
      this.error = 'No se pudo cargar la información de deuda. Intenta más tarde.';
      console.error(err);
    }
  }
}
