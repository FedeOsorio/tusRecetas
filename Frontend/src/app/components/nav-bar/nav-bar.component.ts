import { Component } from '@angular/core';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private sesionService: SesionService) { }

  ngOnInit() {
    if (sessionStorage.getItem('usuarioLogueado')) {
      this.sesionService.autenticado = true;
    }
  }

  get ocultarBoton(): boolean {
    return this.sesionService.autenticado;
  }

  cerrarSesion() {
    this.sesionService.cerrarSesion();
  }
}