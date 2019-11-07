import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { PersonaService } from '../../services/persona.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'usuario-form-mantenimiento',
  templateUrl: './usuario-form-mantenimiento.component.html',
  styleUrls: ['./usuario-form-mantenimiento.component.css']
})
export class UsuarioFormMantenimientoComponent implements OnInit {

  usuario: FormGroup;
  titulo: string = "";
  parametro: string = "";
  tipoUsuarios: any;
  personas: any;
  ver: boolean = true;
  constructor(private usuarioService: UsuarioService, private router: Router, private activatedRoute: ActivatedRoute, private personaService: PersonaService) {
    this.usuario = new FormGroup({
      'idUsuario': new FormControl("0"),
      'nombreUsuario': new FormControl("", [Validators.required, Validators.maxLength(100)], this.noRepetirUsuario.bind(this)),
      'contra': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      'contra2': new FormControl("", [Validators.required, Validators.maxLength(100), this.validarContraIguales.bind(this)]),
      'idPersona': new FormControl("", Validators.required),
      'idTipoUsuario': new FormControl("", Validators.required)
    });
    this.activatedRoute.params.subscribe(param => {
      this.parametro = param["id"];
      
      if (this.parametro == "nuevo") {
        this.ver = true;
      } else {
        this.ver = false;

        this.usuarioService.recuperarUsuario(this.parametro).subscribe(data => {
          this.usuario.controls["idUsuario"].setValue(data.idUsuario);
          this.usuario.controls["nombreUsuario"].setValue(data.nombreUsuario);
          this.usuario.controls["idTipoUsuario"].setValue(data.idTipoUsuario);

          this.usuario.controls["contra"].setValue("1");
          this.usuario.controls["contra2"].setValue("1");
          this.usuario.controls["idPersona"].setValue("1");
        });

      }
      
    });
  }

  ngOnInit() {
    this.usuarioService.getTipoUsuario().subscribe(data => this.tipoUsuarios = data);
    this.personaService.listarPersonaCombo().subscribe(data => this.personas = data);

    if (this.parametro == "nuevo") {
      this.titulo = "Agregar usuario";
    } else {
      this.titulo = "Editar usuario";
    }
  }

  validarContraIguales(control:FormControl) {
    if (control.value != "" && control.value != null) {
      if (this.usuario.controls["contra"].value != control.value) {
        return { noIguales: true };
      } else {
        return null;
      }
    }
  }

  noRepetirUsuario(control:FormControl) {
    let promesa = new Promise((resolve, reject) => {

      if (control.value != null && control.value != "") {
        this.usuarioService.validarUsuario(this.usuario.controls["idUsuario"].value, control.value)
          .subscribe(data => {
            
            if (data == 1) {
              resolve({ yaExiste: true });
            } else {
              resolve(null);
            }
          })
      }

    });
    return promesa;
  }

  guardarDatos() {
    if (this.usuario.valid) {
      this.usuarioService.guardarDatos(this.usuario.value).subscribe(res => {
        this.router.navigate(["/mantenimiento-usuario"]);
      });
    }
  }
}
