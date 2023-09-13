import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  autenticado: boolean = false;

  cerrarSesion() {
    this.autenticado = false;
    sessionStorage.removeItem('usuarioLogueado')
    location.href = "/";
  }

}