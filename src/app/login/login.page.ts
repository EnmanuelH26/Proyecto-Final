import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response.success) {
          localStorage.setItem('authToken', response.data.authToken); // Guarda el token si lo necesitas
          this.router.navigate(['/main-page']); // Redirige a la página principal
        } else {
          alert('Inicio de sesión fallido');
        }
      },
      (error) => {
        console.error(error);
        alert('Hubo un error en el inicio de sesión');
      }
    );
  }
}
