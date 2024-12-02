import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
})
export class SolicitudesPage implements OnInit {
  tiposSolicitudes: any[] = [];
  solicitudes: any[] = [];
  solicitudSeleccionada: string | null = null;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarTiposSolicitudes();
    this.cargarMisSolicitudes();
  }

  async cargarTiposSolicitudes() {
    const apiUrl = 'https://api.uasd.edu.do/tipos-solicitudes'; // Cambia por la URL real
    try {
      const response: any = await this.http.get(apiUrl).toPromise();
      if (response && response.success) {
        this.tiposSolicitudes = response.data;
      } else {
        this.error = 'Error al cargar los tipos de solicitudes.';
      }
    } catch (err) {
      console.error(err);
      this.error = 'No se pudo cargar los tipos de solicitudes.';
    }
  }

  async cargarMisSolicitudes() {
    const apiUrl = 'https://api.uasd.edu.do/mis-solicitudes'; // Cambia por la URL real
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response: any = await this.http.get(apiUrl, { headers }).toPromise();
      if (response && response.success) {
        this.solicitudes = response.data;
      } else {
        this.error = 'Error al cargar tus solicitudes.';
      }
    } catch (err) {
      console.error(err);
      this.error = 'No se pudo cargar tus solicitudes.';
    }
  }

  async crearSolicitud() {
    if (!this.solicitudSeleccionada) {
      alert('Debes seleccionar un tipo de solicitud.');
      return;
    }

    const apiUrl = 'https://api.uasd.edu.do/crear-solicitud'; // Cambia por la URL real
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      tipo: this.solicitudSeleccionada,
    };

    try {
      const response: any = await this.http.post(apiUrl, body, { headers }).toPromise();
      if (response && response.success) {
        alert('Solicitud creada exitosamente.');
        this.cargarMisSolicitudes();
      } else {
        alert('Error al crear la solicitud.');
      }
    } catch (err) {
      console.error(err);
      alert('No se pudo crear la solicitud.');
    }
  }
}
