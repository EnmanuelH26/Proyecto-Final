import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    const url = 'https://uasdapi.ia3x.com/login';
    const body = this.loginForm.value;

    this.http.post<any>(url, body).subscribe(
      (response) => {
        if (response.success) {
          const authToken = response.data.authToken;
          console.log('Auth Token:', authToken);

          // Guardar token en localStorage o servicio si es necesario
          localStorage.setItem('authToken', authToken);

          // Redirigir a la página deseada
          this.router.navigate(['/landing']);
        } else {
          alert('Login fallido: ' + response.message);
        }
      },
      (error) => {
        console.error('Error en el login', error);
        alert('Error en la autenticación. Intenta de nuevo.');
      }
    );
  }
}
