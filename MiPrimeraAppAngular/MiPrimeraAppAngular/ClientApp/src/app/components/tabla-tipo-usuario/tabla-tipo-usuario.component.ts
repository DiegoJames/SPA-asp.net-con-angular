import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'tabla-tipo-usuario',
  templateUrl: './tabla-tipo-usuario.component.html',
  styleUrls: ['./tabla-tipo-usuario.component.css']
})
export class TablaTipoUsuarioComponent implements OnInit {

  tipoUsuarios: any;
  cabeceras: string[] = ["Id Tipo Usuario", "Nombre", "Descripcion"];
  @Input() isMantenimiento = false;
  p: number = 1;
  constructor(private usuarioService: UsuarioService) {

  }

  ngOnInit() {
    this.usuarioService.listarTiposUsuarios().subscribe(data => this.tipoUsuarios = data);
  }

  eliminar(idTipoUsuario) {
    if (confirm("Desea eliminar realmente?") == true) {
      this.usuarioService.eliminarTipoUsuario(idTipoUsuario).subscribe(res => {
        this.usuarioService.listarTiposUsuarios().subscribe(data => this.tipoUsuarios = data);
      });
    }
  }

}
