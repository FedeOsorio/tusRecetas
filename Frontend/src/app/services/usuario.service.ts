import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';

interface LoginRequest {
  usuario: string;
  clave: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest) {
    return this.http.post<LoginRequest[]>('http://localhost:9080/usuarios/login', loginRequest);
  }

  getDatosUsuario(usuarioLogueado: string) {
    return this.http.get<Usuario>(`http://localhost:9080/usuarios/${usuarioLogueado}`)
  }

  putUsuarioCompleto(usuarioLogueado: string, usuarioFullUpdate: {}) {
    return this.http.put<Usuario>(`http://localhost:9080/usuarios/${usuarioLogueado}/update`, usuarioFullUpdate);
  }

  patchUsuario(usuarioLogueado: string, datoActualizado: {}) {
    return this.http.patch(`http://localhost:9080/usuarios/${usuarioLogueado}/patch`, datoActualizado)
  }

  registrarUsuario(usuarioCreado: {}) {
    return this.http.post('http://localhost:9080/usuarios/add', usuarioCreado)
  }

  deleteUsuario(nombreUsuario: string) {
    return this.http.delete(`http://localhost:9080/usuarios/delete/${nombreUsuario}`)
  }

}
