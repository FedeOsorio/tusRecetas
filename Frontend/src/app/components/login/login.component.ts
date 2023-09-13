import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SesionService } from 'src/app/services/sesion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

interface LoginRequest {
  usuario: string;
  clave: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  mostrarClave = false;
  usuarioIngresado: string = '';
  claveIngresada: string = "";
  usuarioEncontrado: LoginRequest | undefined;

  logForm: FormGroup;
  mostrarErrorUsuario = false;
  mostrarErrorClave = false;
  mostrarInvalido = false;

  constructor(
    private usuarioService: UsuarioService,
    private sesionService: SesionService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.logForm = this.fb.group({
      usuario: ["", Validators.required],
      clave: ["", Validators.required]
    });
  }

  getDataUsuario(): void {
    this.usuarioIngresado = this.logForm.get('usuario')?.value;
    this.claveIngresada = this.logForm.get('clave')?.value;

    const loginRequest = {
      usuario: this.usuarioIngresado,
      clave: this.claveIngresada
    };

    if (this.usuarioIngresado == '') {
      console.log('El nombre de usuario está vacío');
      this.mostrarErrorUsuario = true;
      return;
    } else if (this.usuarioIngresado != "" && this.claveIngresada == "") {
      this.mostrarErrorUsuario = false;
      this.mostrarErrorClave = true;
      this.mostrarInvalido = true;
      return;
    }

    this.usuarioService.login(loginRequest).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log(`Los datos de acceso para el usuario ${this.usuarioIngresado} son inválidos o no existe ese usuario`);
          this.mostrarInvalido = true;
        } else {
          console.log(error);
        }
        return of(null);
      })
    )
      .subscribe(response => {
        if (response) {
          console.log("Inicio de sesión correcto");
          sessionStorage.setItem('usuarioLogueado', this.usuarioIngresado)
          this.sesionService.autenticado = true;
          this.router.navigate(['/']);
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1700,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: '¡Inicio de sesión exitoso!'
          })
        }
      });
  }
}