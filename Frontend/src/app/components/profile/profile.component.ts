import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  componenteDatos: boolean = true;
  componenteAyuda: boolean = false;

  abrirComponenteDatos(){
    this.componenteDatos = true;
    this.componenteAyuda = false;
  }

  abrirComponenteAyuda(){
    this.componenteAyuda = true;
    this.componenteDatos = false;
  }

}