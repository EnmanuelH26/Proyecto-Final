import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  news: any[] = []; // Array para almacenar las noticias
  loading: boolean = true; // Indicador de carga

  constructor(private http: HttpClient, private toastController: ToastController) {}

  ngOnInit() {
    this.loadNews(); // Cargar las noticias al iniciar la página
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

  // Método para cargar noticias desde la API
  loadNews() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.showToast('No se encontró un token. Redirigiendo al login.');
      return;
    }

    this.http.get('https://uasdapi.ia3x.com/noticias', {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe(
      (response: any) => {
        if (response.success) {
          this.news = response.data; // Asignar las noticias al array
          this.loading = false;
        } else {
          this.showToast('Error al cargar las noticias.');
          this.loading = false;
        }
      },
      (error) => {
        console.error('Error al cargar noticias:', error);
        this.showToast('Error al cargar noticias.');
        this.loading = false;
      }
    );
  }

  // Método para abrir una noticia en un enlace externo
  openNews(url: string) {
    if (url) {
      window.open(url, '_blank'); // Abrir en nueva pestaña
    } else {
      this.showToast('No hay enlace disponible para esta noticia.');
    }
  }
}
