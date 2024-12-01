import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage {
  constructor(private router: Router) {}

  logout() {
    // Borra cualquier token o estado de sesión
    localStorage.removeItem('authToken'); // Si usas localStorage
    this.router.navigate(['/login']); // Redirige al login
  }
}
