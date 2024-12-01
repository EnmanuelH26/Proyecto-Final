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
  loginForm: FormGroup;
  isRecoveryModalOpen = false;
  //recoveryForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
  
      this.authService.login(username, password).subscribe(
        (response) => {
          if (response.success) {
            this.router.navigate(['/main-menu']);
          } else {
            alert(`Error: ${response.message}`);
          }
        },
        (error) => {
          console.error('Detalles del error:', error);
          alert(`Error del servidor: ${error.status} - ${error.message}`);
        }
      );
    }
  }
  openRecoveryModal() {
    this.isRecoveryModalOpen = true;
  }
  
  closeRecoveryModal() {
    this.isRecoveryModalOpen = false;
  }
  
  // onRecoverPassword() {
  //   if (this.recoveryForm.valid) {
  //     const email = this.recoveryForm.value.email;
  //     this.authService.recoverPassword(email).subscribe(
  //       (response) => {
  //         alert(response.message);
  //         this.closeRecoveryModal();
  //       },
  //       (error) => {
  //         alert('Ocurrió un error al enviar el correo. Intenta nuevamente.');
  //       }
  //     );
  //   }
}
