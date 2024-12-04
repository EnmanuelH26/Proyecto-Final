import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {
  horarios: any[] = []; // Array para almacenar los horarios
  loading: boolean = true; // Indicador de carga

  constructor(private http: HttpClient, private toastController: ToastController) {}

  ngOnInit() {
    this.loadHorarios(); // Cargar los horarios al iniciar la página
  }

  // Método para mostrar mensajes de toast
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  // Método para cargar los horarios desde la API
  loadHorarios() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.showToast('No se encontró un token. Redirigiendo al login.');
      return;
    }

    this.http.get('https://uasdapi.ia3x.com/horarios', {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe(
      (response: any) => {
        this.horarios = response; // Asignar los horarios al array
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar horarios:', error);
        this.showToast('Error al cargar horarios.');
        this.loading = false;
      }
    );
  }

  // Método para formatear una fecha en formato legible
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString();
  }
}
