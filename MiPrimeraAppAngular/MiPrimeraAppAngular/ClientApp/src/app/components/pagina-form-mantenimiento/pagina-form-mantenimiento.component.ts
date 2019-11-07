import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'pagina-form-mantenimiento',
  templateUrl: './pagina-form-mantenimiento.component.html',
  styleUrls: ['./pagina-form-mantenimiento.component.css']
})
export class PaginaFormMantenimientoComponent implements OnInit {
  pagina: FormGroup;
  titulo: string = "";
  parametro: string = "";

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService) {
    this.pagina = new FormGroup({
      'idPagina': new FormControl("0"),
      'mensaje': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      'accion': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      'bVisible': new FormControl("1")
    });

    this.activatedRoute.params.subscribe(param => {
      this.parametro = param["id"];
      if (this.parametro == "nuevo") {
        this.titulo = "Agregar pagina";
      } else {
        this.titulo = "Editar pagina";
      }
    })

  }

  ngOnInit() {
    if (this.parametro != "nuevo") {
      this.usuarioService.recuperarPagina(this.parametro).subscribe(data => {
        if (data.accion == null) {
          this.router.navigate(["/no-encontro-informacion"]);
        } else {
          this.pagina.controls["idPagina"].setValue(data.idPagina);
          this.pagina.controls["mensaje"].setValue(data.mensaje);
          this.pagina.controls["accion"].setValue(data.accion);
          this.pagina.controls["bVisible"].setValue(data.bVisible.toString());
        }
        
      })
    }
  }

  guardarDatos() {
    if (this.pagina.valid) {
      this.usuarioService.guardarPagina(this.pagina.value).subscribe(data => { this.router.navigate(["/mantenimiento-pagina"]) })
    }
  }

}
