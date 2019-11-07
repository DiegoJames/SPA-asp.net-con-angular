import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'buscardor-producto-nombre',
  templateUrl: './buscardor-producto-nombre.component.html',
  styleUrls: ['./buscardor-producto-nombre.component.css']
})
export class BuscardorProductoNombreComponent implements OnInit {

  @Output() clickButton: EventEmitter<any>;
  @Output() limpiarButton: EventEmitter<any>;

  constructor() {
    this.clickButton = new EventEmitter();
    this.limpiarButton = new EventEmitter();
  }

  ngOnInit() {
  }


  filtrar(nombre) {
    this.clickButton.emit(nombre);
  }

  limpiar(nombre) {
    this.limpiarButton.emit(nombre);
  }

}
