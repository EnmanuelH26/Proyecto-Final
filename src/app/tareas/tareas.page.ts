import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  tareas: any[] = [];
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarTareas();
  }

  async cargarTareas() {
    const apiUrl = 'https://api.uasd.edu.do/mis-tareas'; // Cambia por la URL real
    const token = localStorage.getItem('authToken'); // Obtén el token de autenticación

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    try {
      const response: any = await this.http.get(apiUrl, { headers }).toPromise();
      if (response && response.success) {
        this.tareas = response.data;
      } else {
        this.error = 'Error al cargar las tareas pendientes.';
      }
    } catch (err) {
      console.error(err);
      this.error = 'No se pudo cargar las tareas.';
    }
  }

  esProximaAVencer(fechaLimite: string): boolean {
    const hoy = new Date();
    const fechaTarea = new Date(fechaLimite);
    const diferencia = fechaTarea.getTime() - hoy.getTime();
    const diasRestantes = diferencia / (1000 * 60 * 60 * 24);
    return diasRestantes <= 3; // Consideramos próximas a vencer las tareas con 3 días o menos
  }
}
