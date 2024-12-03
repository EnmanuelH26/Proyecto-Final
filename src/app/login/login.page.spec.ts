import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async login() {
    if (!this.username || !this.password) {
      this.showToast('Por favor, completa todos los campos.');
      return;
    }

    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        const token = response.token;
        this.authService.saveToken(token); // Guardar el token en el servicio
        this.router.navigate(['/landing']);
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
