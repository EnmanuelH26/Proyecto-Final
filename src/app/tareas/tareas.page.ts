import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  tareas: any[] = [];
  loading: boolean = true;

  constructor(private http: HttpClient, private toastController: ToastController) {}

  ngOnInit() {
    this.loadTareas();
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  loadTareas() {
    const token = localStorage.getItem('token');

    this.http.get('https://uasdapi.ia3x.com/tareas', {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        if (Array.isArray(response)) {
          this.tareas = response;
        } else {
          this.showToast('Error al cargar las tareas.');
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar tareas:', error);
        this.showToast('Error al cargar tareas.');
      }
    );
  }

  // Verifica si una tarea está próxima a vencer
  isNearDeadline(fechaVencimiento: string): boolean {
    const hoy = new Date();
    const vencimiento = new Date(fechaVencimiento);
    const diferenciaDias = (vencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);
    return diferenciaDias <= 3 && diferenciaDias > 0;
  }
}
