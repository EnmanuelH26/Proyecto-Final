import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
  eventos: any[] = [];
  eventoSeleccionado: any = null;
  loading: boolean = true;

  constructor(private http: HttpClient, private toastController: ToastController) { }

  ngOnInit() {
    this.loadEventos();
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  loadEventos() {

    const token = localStorage.getItem('token');
    console.log(token)
    this.http.get('https://uasdapi.ia3x.com/eventos', {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        if (Array.isArray(response)) {
          this.eventos = response;
        } else {
          this.showToast('Error al cargar los eventos.');
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar eventos:', error);
        this.showToast('Error al cargar eventos.');
      }
    );
  }
  
  verDetalles(evento: any) {
    this.eventoSeleccionado = evento;
  }

  cerrarDetalles() {
    this.eventoSeleccionado = null;
  }
}