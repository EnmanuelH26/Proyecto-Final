import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-preseleccion',
  templateUrl: './preseleccion.page.html',
  styleUrls: ['./preseleccion.page.scss'],
})
export class PreseleccionPage implements OnInit {
  materiasDisponibles: any[] = [];
  materiasPreseleccionadas: any[] = [];
  loading: boolean = true;

  constructor(private http: HttpClient, private toastController: ToastController) {}

  ngOnInit() {
    this.loadMateriasDisponibles();
    this.loadPreselecciones();
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  loadMateriasDisponibles() {
    const token = localStorage.getItem('token');
    this.http.get('https://uasdapi.ia3x.com/materias_disponibles', {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe(
      (response: any) => {
        console.log('Materias Disponibles:', response);
        this.materiasDisponibles = Array.isArray(response) ? response : [];
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar materias disponibles:', error);
      }
    );
  }
  
  loadPreselecciones() {
    const token = localStorage.getItem('token');
    this.http.get('https://uasdapi.ia3x.com/ver_preseleccion', {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe(
      (response: any) => {
        console.log('Preselecciones:', response);
        this.materiasPreseleccionadas = response.data || [];
      },
      (error) => {
        console.error('Error al cargar preselecciones:', error);
      }
    );
  }
  

  preseleccionarMateria(codigo: string) {
    const token = localStorage.getItem('token');
  
    this.http.post('https://uasdapi.ia3x.com/preseleccionar_materia', JSON.stringify(codigo), {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).subscribe(
      (response: any) => {
        if (response.success) {
          this.showToast(response.message);
          this.loadPreselecciones(); // Recargar preselecciones
        } else {
          this.showToast('Error al preseleccionar materia.');
        }
      },
      (error) => {
        console.error('Error completo:', error);
        this.showToast('Error al preseleccionar materia.');
      }
    );
  }
  
  
  cancelarPreseleccion(codigo: string) {
    const token = localStorage.getItem('token');
    this.http.post('https://uasdapi.ia3x.com/cancelar_preseleccion_materia', JSON.stringify(codigo), {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).subscribe(
      (response: any) => {
        if (response.success) {
          this.showToast(response.message);
          this.loadPreselecciones(); // Recargar preselecciones
        } else {
          this.showToast('Error al cancelar preselección.');
        }
      },
      (error) => {
        console.error('Error al cancelar preselección:', error);
        this.showToast('Error al cancelar preselección.');
      }
    );
  }
}
