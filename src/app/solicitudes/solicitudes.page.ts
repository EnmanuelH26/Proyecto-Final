import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
})
export class SolicitudesPage implements OnInit {
  tiposSolicitudes: any[] = [];
  misSolicitudes: any[] = [];
  nuevaSolicitud = {
    tipo: '',
    descripcion: ''
  };
  loading: boolean = true;

  constructor(private http: HttpClient, private toastController: ToastController) {}

  ngOnInit() {
    this.loadTiposSolicitudes();
    this.loadMisSolicitudes();
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  loadTiposSolicitudes() {
    const token = localStorage.getItem('token');
    this.http.get('https://uasdapi.ia3x.com/tipos_solicitudes', {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe(
      (response: any) => {
        if (response.success) {
          this.tiposSolicitudes = response.data;
        } else {
          this.showToast('Error al cargar los tipos de solicitudes.');
        }
      },
      (error) => {
        console.error('Error al cargar tipos de solicitudes:', error);
        this.showToast('Error al cargar tipos de solicitudes.');
      }
    );
  }

  loadMisSolicitudes() {
    const token = localStorage.getItem('token');
    this.http.get('https://uasdapi.ia3x.com/mis_solicitudes', {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe(
      (response: any) => {
        if (response.success) {
          this.misSolicitudes = response.data;
        } else {
          this.showToast('Error al cargar las solicitudes.');
        }
      },
      (error) => {
        console.error('Error al cargar solicitudes:', error);
        this.showToast('Error al cargar solicitudes.');
      }
    );
  }

  crearSolicitud() {
    const token = localStorage.getItem('token');
    this.http.post('https://uasdapi.ia3x.com/crear_solicitud', this.nuevaSolicitud, {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe(
      (response: any) => {
        if (response.success) {
          this.showToast('Solicitud creada exitosamente.');
          this.loadMisSolicitudes(); // Recargar solicitudes
          this.nuevaSolicitud = { tipo: '', descripcion: '' }; // Limpiar el formulario
        } else {
          this.showToast('Error al crear la solicitud.');
        }
      },
      (error) => {
        console.error('Error al crear solicitud:', error);
        this.showToast('Error al crear solicitud.');
      }
    );
  }

  cancelarSolicitud(id: number) {
    const token = localStorage.getItem('token');
  
    this.http.post('https://uasdapi.ia3x.com/cancelar_solicitud', id, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Asegúrate de definir el tipo de contenido
      },
      responseType: 'json',
    }).subscribe(
      (response: any) => {
        if (response.success) {
          this.showToast('Solicitud cancelada exitosamente.');
          this.loadMisSolicitudes(); // Recargar solicitudes
        } else {
          this.showToast('Error al cancelar la solicitud.');
        }
      },
      (error) => {
        console.error('Error al cancelar solicitud:', error);
        this.showToast('Error al cancelar solicitud.');
      }
    );
  }
}
