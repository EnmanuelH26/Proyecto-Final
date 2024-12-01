import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage, // Define el componente principal de esta ruta
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // No vuelvas a cargar su propio módulo
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
