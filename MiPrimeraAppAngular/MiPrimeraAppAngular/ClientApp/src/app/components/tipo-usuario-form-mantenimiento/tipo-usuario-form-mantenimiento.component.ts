import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tipo-usuario-form-mantenimiento',
  templateUrl: './tipo-usuario-form-mantenimiento.component.html',
  styleUrls: ['./tipo-usuario-form-mantenimiento.component.css']
})
export class TipoUsuarioFormMantenimientoComponent implements OnInit {

  tipoUsuario: FormGroup;
  paginas: any;
  parametro: string;
  titulo: string;
  constructor(private usuarioService: UsuarioService, private activatedRoute: ActivatedRoute, private router: Router) {

    this.tipoUsuario = new FormGroup({
      'idTipoUsuario': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      'descripcion': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      "valores": new FormControl("")
    });

    this.activatedRoute.params.subscribe(param => {
      this.parametro = param["id"];
      if (this.parametro == "nuevo") {
        this.titulo = "Agregar un tipo usaurio";
      } else {
        this.titulo = "Editar un tipo usaurio";
      }
    })

    this.usuarioService.listarPaginasTiposUsuarios().subscribe(data => {
      this.paginas = data;
    });
  }

  ngOnInit() {
    // Recuperar inforamcion
    if (this.parametro != "nuevo") {
      this.usuarioService.listarPaginasRecuperar(this.parametro).subscribe(res => {
        this.tipoUsuario.controls["idTipoUsuario"].setValue(res.idTipoUsuario);
        this.tipoUsuario.controls["nombre"].setValue(res.nombre);
        this.tipoUsuario.controls["descripcion"].setValue(res.descripcion);
        var listaPaginas = res.listaPagina.map(p => p.idPagina);

        // Pinta la inforamcion
        setTimeout(() => {
          var checks = document.getElementsByClassName("check");
          var ncheck = checks.length;
          var check;
          for (var i = 0; i < ncheck; i++) {
            check = checks[i];
            var indice = listaPaginas.indexOf(check.name * 1);
            if (indice > -1) {
              check.checked = true;
            }
          }
        },500)
      })
    }

  }

  guardarDatos() {
    if (this.tipoUsuario) {
      this.usuarioService.guardarDatosTipoUsuario(this.tipoUsuario.value).subscribe(res => {
        this.router.navigate(["/mantenimiento-tipoUsuario"]);
      });
    }
  }

  verCheck() {
    var seleccionados = "";
    var checks = document.getElementsByClassName("check");
    var check;
    for (var i = 0; i < checks.length; i++) {
      check = checks[i];
      if (check.checked) {
        seleccionados += check.name;
        seleccionados += "$";
      }
    }
    if (seleccionados != "") {
      seleccionados = seleccionados.substring(0, seleccionados.length - 1);
    }
    this.tipoUsuario.controls["valores"].setValue(seleccionados);
  }

}
