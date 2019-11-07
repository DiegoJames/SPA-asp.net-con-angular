import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//Importar lo siguiente para trabajar con formularios
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

//Registrar el componente creado
import { ButtonAgregar } from './components/button/Button.component';
import { diasSemana } from './components/DiasSemana/diasSemana.component';
import { TablaProductoComponent } from './components/tabla-producto/tabla-producto.component';

//Services
import { ProductoService } from './services/Producto.Service';
import { CategoriaService } from './services/categoria.service';
import { PersonaService } from './services/persona.service';
import { UsuarioService } from './services/usuario.service';

import { HttpModule } from '@angular/http';
import { BuscardorProductoNombreComponent } from './components/buscardor-producto-nombre/buscardor-producto-nombre.component';
import { FiltradoProductoNombreComponent } from './components/filtrado-producto-nombre/filtrado-producto-nombre.component';
import { BuscardorProductoCategoriaComponent } from './components/buscardor-producto-categoria/buscardor-producto-categoria.component';
import { FiltradoProductoCategoriaComponent } from './components/filtrado-producto-categoria/filtrado-producto-categoria.component';
import { TablaPersonaComponent } from './components/tabla-persona/tabla-persona.component';
import { BuscadorPersonaNombreCompletoComponent } from './components/buscador-persona-nombre-completo/buscador-persona-nombre-completo.component';
import { FiltradoPersonaNombreCompletoComponent } from './components/filtrado-persona-nombre-completo/filtrado-persona-nombre-completo.component';
import { BuscadorUsuarioTipoUsuarioComponent } from './components/buscador-usuario-tipo-usuario/buscador-usuario-tipo-usuario.component';
import { FiltradoUsuarioTipoUsuarioComponent } from './components/filtrado-usuario-tipo-usuario/filtrado-usuario-tipo-usuario.component';
import { TablaUsuarioComponent } from './components/tabla-usuario/tabla-usuario.component';
import { MantenimientoPersonaComponent } from './components/mantenimiento-persona/mantenimiento-persona.component';
import { PersonaFormMantenimientoComponent } from './components/persona-form-mantenimiento/persona-form-mantenimiento.component';
import { MantenimientoProductoComponent } from './components/mantenimiento-producto/mantenimiento-producto.component';
import { ProductoFormMantenimientoComponent } from './components/producto-form-mantenimiento/producto-form-mantenimiento.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { MantenimientoUsuarioComponent } from './components/mantenimiento-usuario/mantenimiento-usuario.component';
import { UsuarioFormMantenimientoComponent } from './components/usuario-form-mantenimiento/usuario-form-mantenimiento.component';
import { LoginComponent } from './components/login/login.component';
import { PaginaErrorLoginComponent } from './components/pagina-error-login/pagina-error-login.component';
import { PermisoErrorPaginaComponent } from './components/permiso-error-pagina/permiso-error-pagina.component';

import { SeguridadGuard } from './components/guards/seguridad.guard';
import { ComponenteBienvenidaComponent } from './components/componente-bienvenida/componente-bienvenida.component';
import { MantenimientoTipoUsuarioComponent } from './components/mantenimiento-tipo-usuario/mantenimiento-tipo-usuario.component';
import { TipoUsuarioFormMantenimientoComponent } from './components/tipo-usuario-form-mantenimiento/tipo-usuario-form-mantenimiento.component';
import { TablaTipoUsuarioComponent } from './components/tabla-tipo-usuario/tabla-tipo-usuario.component';
import { TablaPaginaComponent } from './components/tabla-pagina/tabla-pagina.component';
import { MantenimientoPaginaComponent } from './components/mantenimiento-pagina/mantenimiento-pagina.component';
import { PaginaFormMantenimientoComponent } from './components/pagina-form-mantenimiento/pagina-form-mantenimiento.component';
import { NoEncontroInformacionComponent } from './components/no-encontro-informacion/no-encontro-informacion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ButtonAgregar,
    diasSemana,
    TablaProductoComponent,
    BuscardorProductoNombreComponent,
    FiltradoProductoNombreComponent,
    BuscardorProductoCategoriaComponent,
    FiltradoProductoCategoriaComponent,
    TablaPersonaComponent,
    BuscadorPersonaNombreCompletoComponent,
    FiltradoPersonaNombreCompletoComponent,
    BuscadorUsuarioTipoUsuarioComponent,
    FiltradoUsuarioTipoUsuarioComponent,
    TablaUsuarioComponent,
    MantenimientoPersonaComponent,
    PersonaFormMantenimientoComponent,
    MantenimientoProductoComponent,
    ProductoFormMantenimientoComponent,
    MantenimientoUsuarioComponent,
    UsuarioFormMantenimientoComponent,
    LoginComponent,
    PaginaErrorLoginComponent,
    PermisoErrorPaginaComponent,
    ComponenteBienvenidaComponent,
    MantenimientoTipoUsuarioComponent,
    TipoUsuarioFormMantenimientoComponent,
    TablaTipoUsuarioComponent,
    TablaPaginaComponent,
    MantenimientoPaginaComponent,
    PaginaFormMantenimientoComponent,
    NoEncontroInformacionComponent
  ],
  imports: [
    HttpModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      { path: 'filtradoProductoCategoria', component: FiltradoProductoCategoriaComponent, pathMatch: 'full', canActivate: [SeguridadGuard] },
      { path: 'filtradoProductoNombre', component: FiltradoProductoNombreComponent, canActivate: [SeguridadGuard] },
      { path: 'filtradoPersonaNombreCompleto', component: FiltradoPersonaNombreCompletoComponent, canActivate: [SeguridadGuard] },
      { path: 'filtradoUsuarioTipo', component: FiltradoUsuarioTipoUsuarioComponent, canActivate: [SeguridadGuard] },
      { path: 'mantenimiento-persona', component: MantenimientoPersonaComponent, canActivate: [SeguridadGuard] },
      { path: 'persona-form-mantenimiento/:id', component: PersonaFormMantenimientoComponent, canActivate: [SeguridadGuard] },
      { path: 'mantenimiento-producto', component: MantenimientoProductoComponent, canActivate: [SeguridadGuard] },
      { path: 'producto-form-mantenimiento/:id', component: ProductoFormMantenimientoComponent, canActivate: [SeguridadGuard] },
      { path: 'mantenimiento-usuario', component: MantenimientoUsuarioComponent, canActivate: [SeguridadGuard] },
      { path: 'usuario-form-mantenimiento/:id', component: UsuarioFormMantenimientoComponent, canActivate: [SeguridadGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'pagina-error-login', component: PaginaErrorLoginComponent },
      { path: 'permiso-error-pagina', component: PermisoErrorPaginaComponent },
      { path: 'componente-bienvenida', component: ComponenteBienvenidaComponent },
      { path: 'mantenimiento-tipoUsuario', component: MantenimientoTipoUsuarioComponent, canActivate: [SeguridadGuard] },
      { path: 'tipoUsuario-form-mantenimiento/:id', component: TipoUsuarioFormMantenimientoComponent, canActivate: [SeguridadGuard] },
      { path: 'mantenimiento-pagina', component: MantenimientoPaginaComponent, canActivate: [SeguridadGuard] },
      { path: 'pagina-form-mantenimiento/:id', component: PaginaFormMantenimientoComponent, canActivate: [SeguridadGuard]},
      { path: 'no-encontro-informacion', component: NoEncontroInformacionComponent }

    ])
  ],
  providers: [ProductoService, CategoriaService, PersonaService, UsuarioService, SeguridadGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
