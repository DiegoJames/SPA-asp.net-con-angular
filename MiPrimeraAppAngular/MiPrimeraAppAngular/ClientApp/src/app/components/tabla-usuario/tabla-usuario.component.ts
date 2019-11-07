import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'tabla-usuario',
  templateUrl: './tabla-usuario.component.html',
  styleUrls: ['./tabla-usuario.component.css']
})
export class TablaUsuarioComponent implements OnInit {

  @Input() usuarios: any;
  @Input() isMantenimiento = false;
  cabeceras: string[] = ["Id Usuario", "Nombre Usuario","Nombre Completo Persona", "Nombre Tipo Usuario"];
  p: number = 1;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsuario().subscribe(res => this.usuarios = res);
  }

  eliminar(idUsuario) {
    if (confirm("Desea eliminar realmente?") == true) {
      this.usuarioService.eliminarUsuario(idUsuario).subscribe(data => {
        this.usuarioService.getUsuario().subscribe(
          data => this.usuarios = data
        );
      });
    }
  }

}
