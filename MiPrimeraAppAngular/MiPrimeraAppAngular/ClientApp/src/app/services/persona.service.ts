import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class PersonaService {

  urlBase: string;

  constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
    this.urlBase = baseUrl;
  }

  getPersona() {
    return this.http.get(this.urlBase + "api/Persona/listarPersonas")
      .map(res => res.json());
  }

  getPersonaFiltro(nombreCompleto) {
    return this.http.get(this.urlBase + "api/persona/filtrarPersona/" + nombreCompleto)
      .map(res => res.json());
  }

  agregarPersona(persona) {
    return this.http.post(this.urlBase + "api/Persona/guardarPersona/", persona)
      .map(res => res.json());
  }

  recuperarPersona(idPersona) {
    return this.http.get(this.urlBase + "api/Persona/recuperarPersona/" + idPersona)
      .map(res => res.json());
  }

  eliminarPersona(idPersona) {
    return this.http.get(this.urlBase + "api/Persona/eliminarPersona/" + idPersona)
      .map(res => res.json());
  }

  validarCorreo(id,correo) {
    return this.http.get(this.urlBase + "api/Persona/validarCorreo/" + id + "/" + correo)
      .map(res => res.json());
  }

  listarPersonaCombo() {
    return this.http.get(this.urlBase + "api/Persona/listarPersonaCombo")
      .map(res => res.json());
  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }

}
