import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deudas',
  templateUrl: './deudas.page.html',
  styleUrls: ['./deudas.page.scss'],
})
export class DeudasPage implements OnInit {
  deudas: any[] = [];
  loading: boolean = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getDeudas();
  }

  getDeudas() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.http.get('https://uasdapi.ia3x.com/deudas', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).subscribe(
      (response: any) => {
        const token = localStorage.getItem('token');
        console.log('Token almacenado:', token);

        console.log('API Response:', response);

        this.deudas = Array.isArray(response) ? response : Object.values(response);

        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener las deudas:', error);
        this.router.navigate(['/login']);
      }
    );
  }


}
