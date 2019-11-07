import { Component, OnInit, Input } from '@angular/core';
//Importamos el servicio
import { ProductoService } from '../../services/Producto.Service';

@Component({
  selector: 'tabla-producto',
  templateUrl: './tabla-producto.component.html',
  styleUrls: ['./tabla-producto.component.css']
})
export class TablaProductoComponent implements OnInit {

  @Input() productos: any;
  @Input() isMantenimiento = false;
  p: number = 1;
  cabeceras: string[] = ["Id Producto", "Nombre", "Precio", "Stock", "Nombre Categoria"];
  constructor(private producto: ProductoService) { }

  ngOnInit() {
    this.producto.getProducto().subscribe(
      data => this.productos = data
    );
  }

  eliminar(idProducto) {
    if (confirm("Desea eliminar el registro?")) {
      this.producto.eliminarProducto(idProducto).subscribe(P => {
        this.producto.getProducto().subscribe(
          data => this.productos = data
        );
      });
    }
  }

}
