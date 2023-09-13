import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Usuario } from 'src/app/models/Usuario';
import { SesionService } from 'src/app/services/sesion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent {
  constructor(private usuarioService: UsuarioService, private sesionService: SesionService) { }

  usuarioLogueado = sessionStorage.getItem('usuarioLogueado')

  datosUsuario: Usuario = {
    usuario: '',
    clave: '',
    nombre: '',
    apellido: ''
  };

  nuevoUsuario: string = "";
  nuevaClave: string = "";
  nuevoNombre: string = "";
  nuevoApellido: string = "";

  usuarioActualizado = {};

  errorActualizarUsuario: boolean = false;

  camposInvalidos: boolean = false;

  ngOnInit() {
    if (this.usuarioLogueado) {
      this.usuarioService.getDatosUsuario(this.usuarioLogueado).subscribe(respuesta => {
        this.datosUsuario = respuesta;
        console.log(this.datosUsuario);
      });
    }
    console.log(this.sesionService.autenticado);
  }

  mostrarClave: boolean = false;
  ocultarClave() {
    this.mostrarClave = !this.mostrarClave;
  }

  updateUsuario: boolean = false;
  actualizarUsuario() {
    this.updateUsuario = !this.updateUsuario;
    this.camposInvalidos = false;
  }

  updateClave: boolean = false;
  actualizarClave() {
    this.updateClave = !this.updateClave;
    this.camposInvalidos = false;
  }

  updateNombre: boolean = false;
  actualizarNombre() {
    this.updateNombre = !this.updateNombre;
    this.camposInvalidos = false;
  }

  updateApellido: boolean = false;
  actualizarApellido() {
    this.updateApellido = !this.updateApellido;
    this.camposInvalidos = false;
  }

  aceptarActualizar() {
    if (this.nuevoUsuario != "" && this.nuevaClave != "" && this.nuevoApellido != "" && this.nuevoNombre != "" && (this.updateApellido && this.updateClave && this.updateNombre && this.updateUsuario == true)) {
      const usuarioFullUpdate: Usuario = {
        usuario: this.nuevoUsuario,
        clave: this.nuevaClave,
        nombre: this.nuevoNombre,
        apellido: this.nuevoApellido
      }
      if (this.usuarioLogueado) {
        this.usuarioService.putUsuarioCompleto(this.usuarioLogueado, usuarioFullUpdate).subscribe(resp => {
          console.log(resp);
          Swal.fire({
            icon: 'warning',
            text: 'Debe volver a iniciar sesión',
            title: `Su nuevo usuario es: ${this.nuevoUsuario}`
          }).then((result) => {
            if (result.isConfirmed) {
              this.sesionService.cerrarSesion();
            }
          })
        })
      }
      console.log("Condición ok, se va a actualizar");
    } else if (this.updateUsuario == true && this.nuevoUsuario != "" && this.updateClave == false && this.updateApellido == false && this.updateNombre == false) {
      console.log("Se está intentando actualizar el usuario");
      if (this.usuarioLogueado && this.nuevoUsuario) {
        const patchUsuario = {
          usuario: this.nuevoUsuario
        }
        this.usuarioService.patchUsuario(this.usuarioLogueado, patchUsuario).pipe
          (catchError(error => {
            if (error.status === 500) {
              console.log(`El usuario que ingresó ya está en uso`);
              this.errorActualizarUsuario = true;
            } else {
              console.log(error);
            }
            return of(null);
          })).subscribe(respuesta => {
            if (respuesta) {
              console.log(respuesta);
              console.log('Usuario actualizado correctamente');
              Swal.fire({
                icon: 'warning',
                title: 'Debe volver a iniciar sesión',
                text: `Su nuevo usuario es: ${this.nuevoUsuario}`
              }).then((result) => {
                if (result.isConfirmed) {
                  this.sesionService.cerrarSesion();
                }
              })
            }
          });
      }
    } else if (this.updateClave == true && this.nuevaClave != "" && this.updateUsuario == false && this.updateApellido == false && this.updateNombre == false) {
      console.log("solo se va actualizar clave");
      if (this.usuarioLogueado && this.nuevaClave) {
        const patchUsuario = {
          clave: this.nuevaClave
        }
        this.usuarioService.patchUsuario(this.usuarioLogueado, patchUsuario).subscribe(resp => {
          console.log(resp);
          console.log('Clave actualizada correctamente');
          location.reload();
        })
      }
    } else if (this.updateNombre == true && this.nuevoNombre != "" && this.updateClave == false && this.updateApellido == false && this.updateUsuario == false) {
      console.log("Solo se va actualizar nombre");
      if (this.usuarioLogueado && this.nuevoNombre) {
        const patchUsuario = {
          nombre: this.nuevoNombre
        }
        this.usuarioService.patchUsuario(this.usuarioLogueado, patchUsuario).subscribe(resp => {
          console.log(resp);
          console.log('Nombre actualizado correctamente');
          location.reload();
        })
      }
    } else if (this.updateApellido == true && this.nuevoApellido != "" && this.updateClave == false && this.updateUsuario == false && this.updateNombre == false) {
      console.log("solo se va actualizar apellido");
      if (this.usuarioLogueado && this.nuevoApellido) {
        const patchUsuario = {
          apellido: this.nuevoApellido
        }
        this.usuarioService.patchUsuario(this.usuarioLogueado, patchUsuario).subscribe(resp => {
          console.log(resp);
          console.log('Apellido actualizado correctamente');
          location.reload();
        })
      }
    } else {
      console.log("No es posible realizar la actualización, solo puede actualizar de 1 parámetro, o los 4 juntos");
      this.camposInvalidos = true;
    }
  }

  eliminarUsuario() {
    console.log("hola");
    Swal.fire({
      icon: "question",
      title: '¿Está seguro de que desea eliminar su usuario?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Ingrese su contraseña:',
          input: 'password',
          inputPlaceholder: 'Contraseña...',
          showCancelButton: true,
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.value == this.datosUsuario.clave && result.isConfirmed) {
            Swal.fire({
              icon: 'success',
              title: '¡Usuario eliminado!',
              text: 'Se cerrará la sesión.'
            }).then((result) => {
              this.usuarioService.deleteUsuario(this.datosUsuario.usuario).subscribe(resp => {
                console.log(resp);
              })
              if (result.isConfirmed) {
                this.sesionService.cerrarSesion();
              }
            })
          } else if (result.dismiss) {
            Swal.fire('Operación cancelada')
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Contraseña inválida',
              timer: 1500,
              showConfirmButton: false
            })
          }
        })
      } else if (result.isDenied) {
        Swal.fire('Su usuario no fue eliminado.', '', 'info')
      }
    }
    )
  }
}