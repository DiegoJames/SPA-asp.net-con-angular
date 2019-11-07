import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'tabla-pagina',
  templateUrl: './tabla-pagina.component.html',
  styleUrls: ['./tabla-pagina.component.css']
})
export class TablaPaginaComponent implements OnInit {

  paginas: any;
  @Input() isMantenimiento = false;
  cabeceras: string[] = ["Id Pagina", "Nombre Pagina", "Accion"];
  p: number = 1;
  constructor(private usuarioService: UsuarioService) {

  }

  ngOnInit() {
    this.usuarioService.listarPaginasBD().subscribe(res => this.paginas = res);
  }

  eliminar(idPagina) {
    if (confirm("Desea eliminar el registro?") == true) {
      this.usuarioService.eliminarPagina(idPagina).subscribe(res => {
        this.usuarioService.listarPaginasBD().subscribe(
          data => this.paginas = data
        );
      })
    }
  }

}
