import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  user = {
    id: 0,
    nombre: '',
    apellido: '',
    username: '',
    password: '',
    email: '',
    authToken: '',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {}

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  register() {
    // Validación simple para asegurarse de que todos los campos están completos
    if (
      !this.user.nombre ||
      !this.user.apellido ||
      !this.user.username ||
      !this.user.password ||
      !this.user.email
    ) {
      this.showToast('Por favor, completa todos los campos.');
      return;
    }

    this.http.post('https://uasdapi.ia3x.com/crear_usuario', this.user).subscribe(
      (response: any) => {
        if (response.success) {
          this.showToast('Registro exitoso.');
          this.router.navigate(['/login']); // Redirige a la página de login
        } else {
          this.showToast('Error al registrarse. Intenta de nuevo.');
        }
      },
      (error) => {
        console.error('Error en registro:', error);
        this.showToast('Error al registrarse.');
      }
    );
  }
}
