import { Component } from '@angular/core';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  faCopyright = faCopyright;
  faLinkedin = faLinkedin;
  faInstagram = faInstagramSquare;

  email: string = '';

  onSubmit(form: NgForm) {
    console.log(this.email);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `¡Tu suscripción se realizó correctamente!`,
      text: `Correo ingresado: ${this.email}`,
      showConfirmButton: false,
      timer: 2500
    })
    form.reset();
  }
}