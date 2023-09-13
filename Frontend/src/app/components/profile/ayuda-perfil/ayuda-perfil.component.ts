import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ayuda-perfil',
  templateUrl: './ayuda-perfil.component.html',
  styleUrls: ['./ayuda-perfil.component.css']
})
export class AyudaPerfilComponent {
  nombre: string = "";
  correo: string = "";
  asunto: string = "";
  mensaje: string = "";

  @ViewChild('formulario') formulario: NgForm | undefined;

  enviarConsulta(form: NgForm) {
    console.log('Se envió el formulario.');
    console.log('Nombre:', this.nombre);
    console.log('Correo:', this.correo);
    console.log('Asunto:', this.asunto);
    console.log('Mensaje:', this.mensaje);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Su consulta fue enviada',
      text: 'Nos contactaremos a la brevedad',
      showConfirmButton: false,
      timer: 2000
    })
    form.reset();
  }

}