import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {}

  async login() {
    if (!this.username || !this.password) {
      this.showToast('Por favor, completa todos los campos.');
      return;
    }

    const payload = {
      username: this.username,
      password: this.password,
    };

    this.http.post('https://uasdapi.ia3x.com/login', payload).subscribe(
      (response: any) => {
        console.log('Login Response:', response);

        if (response) {
          console.log("Token: " + response.data.authToken);
          localStorage.setItem('token', response.data.authToken);
          this.router.navigate(['/main-menu']);
        } else {
          this.showToast('Error al iniciar sesión. Token no válido.');
        }
        // localStorage.setItem('token', response.token);
        // this.router.navigate(['/main-menu']);
      },
      (error) => {
        this.showToast('Credenciales incorrectas.');
      }
    );
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
