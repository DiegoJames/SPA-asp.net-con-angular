import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'buscardor-producto-categoria',
  templateUrl: './buscardor-producto-categoria.component.html',
  styleUrls: ['./buscardor-producto-categoria.component.css']
})
export class BuscardorProductoCategoriaComponent implements OnInit {

  categorias: any;
  @Output() clickBuscar: EventEmitter<any>;
  @Output() clickLimpiar: EventEmitter<any>;


  constructor(private categoriaService: CategoriaService) {
    this.clickBuscar = new EventEmitter();
    this.clickLimpiar = new EventEmitter();
  }

  ngOnInit() {
    this.categoriaService.getCategoria().subscribe(
      p => this.categorias = p);
  }

  buscar(categoria) {
    this.clickBuscar.emit(categoria);
  }

  limpiar(categoria) {
    this.clickLimpiar.emit(categoria);
  }

}
