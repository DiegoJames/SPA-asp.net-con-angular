import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductoService } from '../../services/Producto.Service';
import { CategoriaService } from '../../services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'producto-form-mantenimiento',
  templateUrl: './producto-form-mantenimiento.component.html',
  styleUrls: ['./producto-form-mantenimiento.component.css']
})
export class ProductoFormMantenimientoComponent implements OnInit {

  producto: FormGroup;
  categorias: any;
  marcas: any;
  titulo: string;
  parametro: string;
  constructor(private productoService: ProductoService, private categoriaService: CategoriaService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.producto = new FormGroup({
      'idProducto': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      'precio': new FormControl("0", Validators.required),
      'stock': new FormControl("0", [Validators.required, this.noPuntoDecimal]),
      'idMarca': new FormControl("", Validators.required),
      'idCategoria': new FormControl("", Validators.required)
    });
    this.activatedRoute.params.subscribe(param => {
      this.parametro = param["id"];
      if (this.parametro == "nuevo") {
        this.titulo = "Agregando un nuevo producto";
      } else {
        this.titulo = "Editando un producto";
      }
    });
    
  }

  ngOnInit() {
    this.productoService.listarMarcas().subscribe(res => this.marcas = res);
    this.categoriaService.getCategoria().subscribe(res => this.categorias = res);
    if (this.parametro != "nuevo") {
      this.productoService.obtenerProductoPorId(this.parametro).subscribe(data => {
        this.producto.controls["idProducto"].setValue(data.idProducto);
        this.producto.controls["nombre"].setValue(data.nombre);
        this.producto.controls["precio"].setValue(data.precio);
        this.producto.controls["stock"].setValue(data.stock);
        this.producto.controls["idMarca"].setValue(data.idMarca);
        this.producto.controls["idCategoria"].setValue(data.idCategoria);

      })
    }
  }

  guardarDatos() {
    if (this.producto.valid) {
      this.productoService.registrarProducto(this.producto.value).subscribe(p => {
        this.router.navigate(['/mantenimiento-producto']);
      });
    }
  }

  noPuntoDecimal(control: FormControl) {
    if (control.value != null && control.value != "") {
      if ((<string>control.value.toString()).indexOf(".") > -1) {
        return { puntoDecimal: true }
      }
    }
    return null
    
  }

}
