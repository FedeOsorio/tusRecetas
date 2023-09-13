import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  regForm: FormGroup;
  mostrarErrores = false;
  mostrarClave = false;
  mostrarDuplicado = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private fb: FormBuilder) {
    this.regForm = this.fb.group({
      usuario: ["", Validators.required],
      clave: ["", [Validators.required, Validators.minLength(5)]],
      nombre: ["", [Validators.required]],
      apellido: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  enviarFormulario() {
    this.mostrarErrores = true;
    if (this.regForm.invalid) {
      return;
    } else {
      const usuarioCreado = {
        "usuario": this.regForm.value.usuario,
        "clave": this.regForm.value.clave,
        "nombre": this.regForm.value.nombre,
        "apellido": this.regForm.value.apellido
      };
      console.log(usuarioCreado);
      this.usuarioService.registrarUsuario(usuarioCreado).subscribe(
        respuesta => {
          console.log(respuesta);
          if(respuesta == 500)
          {
            this.mostrarDuplicado=true;
          }
          this.regForm.reset();
          this.mostrarErrores = false;
          Swal.fire({
            icon: 'success',
            text: 'Tu usuario fue registrado correctamente.',
            title: '¡Ya puedes iniciar sesión!'
          })
          this.router.navigate(['/login']);

        },
        error => {
          if(error.status == 400)
          this.mostrarDuplicado = true;
          console.log(error);
          this.mostrarErrores = false;
        }
      );
    }
  }
}