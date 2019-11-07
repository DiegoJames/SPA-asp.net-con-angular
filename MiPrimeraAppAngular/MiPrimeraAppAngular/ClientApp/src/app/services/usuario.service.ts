import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {

  urlBase: string = "";

  constructor(private http: Http, @Inject("BASE_URL") baseUrl: string, private router: Router ) {
    this.urlBase = baseUrl;
  }

  getUsuario() {
    return this.http.get(this.urlBase + "api/Usuario/listarUsuario")
    .map(res => res.json())
  }

  getTipoUsuario() {
    return this.http.get(this.urlBase + "api/Usuario/listarTipoUsuario")
      .map(res => res.json())
  }

  getFiltrarUsuarioPorTipo(idTipo) {
    return this.http.get(this.urlBase + "api/Usuario/filtrarUsuarioPorTipo/" + idTipo)
      .map(res => res.json())
  }

  validarUsuario(idUsuario, nombre) {
    return this.http.get(this.urlBase + "api/Usuario/validarUsuario/" + idUsuario + "/" + nombre)
      .map(res => res.json())
  }

  recuperarUsuario(idUsuario) {
    return this.http.get(this.urlBase + "api/Usuario/recuperarUsuario/" + idUsuario)
      .map(res => res.json())
  }

  guardarDatos(usuarioCLS) {
    return this.http.post(this.urlBase + "api/Usuario/guardarDatos/", usuarioCLS)
      .map(res => res.json())
  }

  eliminarUsuario(idUsuario) {
    return this.http.get(this.urlBase + "api/Usuario/eliminarUsuario/" + idUsuario)
      .map(res => res.json())
  }

  login(usuario) {
    return this.http.post(this.urlBase + "api/Usuario/login", usuario)
      .map(res => res.json())
  }

  obtenerVariableSession(next) {
    return this.http.get(this.urlBase + "api/Usuario/obtenerVariableSession")
      .map(res => {
        var data = res.json();
        var info = data.valor;

        if (info == "") {
          this.router.navigate(["/pagina-error-login"]);
          return false;
        } else {
          var pagina = next["url"][0].path;
          if (data.lista!=null) {
            var paginas = data.lista.map(pagina => pagina.accion);
            if (paginas.indexOf(pagina) > -1 && pagina != "Login") {
              return true;
            } else {
              this.router.navigate(["/permiso-error-pagina"]);
              return false;
            }
          }
          return true;
        }

      })
  }

  listarPaginas() {
    return this.http.get(this.urlBase + "api/Usuario/listarPaginas")
      .map(res => res.json())
  }

  obtenerSession() {
    return this.http.get(this.urlBase + "api/Usuario/obtenerVariableSession")
      .map(res => {
        var data = res.json();
        var info = data.valor;

        if (info == "") {
          return false;
        } else {
          return true;
        }

      })
  }

  cerrarSesion() {
    return this.http.get(this.urlBase + "api/Usuario/cerrarSesion")
      .map(res => res.json())
  }

  listarTiposUsuarios() {
    return this.http.get(this.urlBase + "api/TipoUsuario/listarTiposUsuarios")
      .map(res => res.json())
  }

  listarPaginasTiposUsuarios() {
    return this.http.get(this.urlBase + "api/TipoUsuario/listarPaginasTiposUsuarios")
      .map(res => res.json())
  }

  listarPaginasRecuperar(idTipoUsuario) {
    return this.http.get(this.urlBase + "api/TipoUsuario/listarPaginasRecuperar/" + idTipoUsuario)
      .map(res => res.json())
  }

  guardarDatosTipoUsuario(tipoUsuarioCLS) {
    return this.http.post(this.urlBase + "api/TipoUsuario/guardarDatosTipoUsuario", tipoUsuarioCLS)
      .map(res => res.json())
  }

  eliminarTipoUsuario(idTipoUsuario) {
    return this.http.get(this.urlBase + "api/TipoUsuario/eliminarTipoUsuario/" + idTipoUsuario)
      .map(res => res.json())
  }

  listarPaginasBD() {
    return this.http.get(this.urlBase + "api/Pagina/listarPaginasBD")
      .map(res => res.json())
  }

  guardarPagina(paginaCLS) {
    return this.http.post(this.urlBase + "api/Pagina/guardarPagina", paginaCLS)
      .map(res => res.json())
  }

  recuperarPagina(idPagina) {
    return this.http.get(this.urlBase + "api/Pagina/recuperarPagina/" + idPagina)
      .map(res => res.json())
  }

  eliminarPagina(idPagina) {
    return this.http.get(this.urlBase + "api/Pagina/eliminarPagina/" + idPagina)
      .map(res => res.json())
  }

}
