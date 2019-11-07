import { Component } from '@angular/core'

@Component({
  selector: "diasSemana",
  templateUrl: "./diasSemana.component.html"
})

export class diasSemana {
  nombre: string = "Diego";
  cursos: string[] = ["LinQ", "Ado.net", "asp.net MVC", "Angular"];
  persona: Object = {
    nombre: "Pepe",
    apellido: "Perez"
  }
  enlace: string = "https://www.google.cl";
}
