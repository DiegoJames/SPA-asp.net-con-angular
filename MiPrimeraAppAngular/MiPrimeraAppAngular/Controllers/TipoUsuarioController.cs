using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAppAngular.Clases;
using MiPrimeraAppAngular.Models;

namespace MiPrimeraAppAngular.Controllers
{
    public class TipoUsuarioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/TipoUsuario/listarTiposUsuarios")]
        public List<TipoUsuarioCLS> listarTiposUsuarios()
        {
            List<TipoUsuarioCLS> listaTipoUsuario = new List<TipoUsuarioCLS>();
            using(BDRestauranteContext bd=new BDRestauranteContext())
            {
                listaTipoUsuario = (from tipoUsuario in bd.TipoUsuario
                                    where tipoUsuario.Bhabilitado == 1
                                    select new TipoUsuarioCLS
                                    {
                                        idTipoUsuario = tipoUsuario.Iidtipousuario,
                                        nombre = tipoUsuario.Nombre,
                                        descripcion = tipoUsuario.Descripcion,
                                        bhabilitado = (int)tipoUsuario.Bhabilitado
                                    }).ToList();
                return listaTipoUsuario;
            }
        }

        [HttpGet]
        [Route("api/TipoUsuario/listarPaginasTiposUsuarios")]
        public List<PaginaCLS> listarPaginasTiposUsuarios()
        {
            List<PaginaCLS> listaPagina = new List<PaginaCLS>();
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                listaPagina = (from pagina in bd.Pagina
                                    where pagina.Bhabilitado == 1
                                    select new PaginaCLS
                                    {
                                        idPagina=pagina.Iidpagina,
                                        mensaje=pagina.Mensaje
                                    }).ToList();
                return listaPagina;
            }
        }

        [HttpPost]
        [Route("api/TipoUsuario/guardarDatosTipoUsuario")]
        public int guardarDatosTipoUsuario([FromBody] TipoUsuarioCLS oTipoUsuarioCLS)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    using(var transaccion= new TransactionScope())
                    {
                        if (oTipoUsuarioCLS.idTipoUsuario==0)
                        {
                            TipoUsuario oTipoUsuario = new TipoUsuario();
                            oTipoUsuario.Nombre = oTipoUsuarioCLS.nombre;
                            oTipoUsuario.Descripcion = oTipoUsuarioCLS.descripcion;
                            oTipoUsuario.Bhabilitado = 1;
                            bd.TipoUsuario.Add(oTipoUsuario);

                            int idTipoUsuario = oTipoUsuario.Iidtipousuario;
                            string[] ids = oTipoUsuarioCLS.valores.Split("$");
                            for(var i=0; i < ids.Length; i++)
                            {
                                PaginaTipoUsuario oPaginaTipoUsuario = new PaginaTipoUsuario();
                                oPaginaTipoUsuario.Iidpagina = int.Parse(ids[i]);
                                oPaginaTipoUsuario.Iidtipousuario = idTipoUsuario;
                                oPaginaTipoUsuario.Bhabilitado = 1;
                                bd.PaginaTipoUsuario.Add(oPaginaTipoUsuario);
                            }
                            bd.SaveChanges();
                            transaccion.Complete();
                            rpta = 1;
                        }
                        else
                        {
                            // Recuperamos la informacion
                            TipoUsuario oTipoUsuario = bd.TipoUsuario.Where(p => p.Iidtipousuario == oTipoUsuarioCLS.idTipoUsuario).First();
                            oTipoUsuario.Nombre = oTipoUsuarioCLS.nombre;
                            oTipoUsuario.Descripcion = oTipoUsuarioCLS.descripcion;
                            bd.SaveChanges();
                            string[] ids = oTipoUsuarioCLS.valores.Split("$");
                            // Aca con el ID tipo usuario (paginas asociadas lo vamos a deshabilitar)
                            List<PaginaTipoUsuario> lista = bd.PaginaTipoUsuario.Where(p => p.Iidtipousuario == oTipoUsuarioCLS.idTipoUsuario).ToList();
                            foreach(PaginaTipoUsuario pag in lista)
                            {
                                pag.Bhabilitado = 0;
                            }
                            // Editar (si el id de pagina es nuevo, lo insertamos, si es un editar
                            // cambiamos de bhabilitado 0 a 1)

                            int cantidad;
                            for (var i = 0; i < ids.Length; i++)
                            {
                                cantidad = lista.Where(p => p.Iidpagina == int.Parse(ids[i])).Count();
                                if (cantidad==0)
                                {
                                    PaginaTipoUsuario oPaginaTipoUsuario = new PaginaTipoUsuario();
                                    oPaginaTipoUsuario.Iidpagina = int.Parse(ids[i]);
                                    oPaginaTipoUsuario.Iidtipousuario = oTipoUsuarioCLS.idTipoUsuario;
                                    oPaginaTipoUsuario.Bhabilitado = 1;
                                    bd.PaginaTipoUsuario.Add(oPaginaTipoUsuario);
                                }
                                else
                                {
                                    PaginaTipoUsuario oPaginaTipoUsuario = lista.Where(p => p.Iidpagina == int.Parse(ids[i])).First();
                                    oPaginaTipoUsuario.Bhabilitado = 1;
                                }
                            }
                            bd.SaveChanges();
                            transaccion.Complete();
                            rpta = 1;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                rpta = 0;
            }
            return rpta;
        }

        [HttpGet]
        [Route("api/TipoUsuario/eliminarTipoUsuario/{idTipoUsuario}")]
        public int eliminarTipoUsuario(int idTipoUsuario)
        {
            int rpta = 0;
            try
            {
                using(BDRestauranteContext bd=new BDRestauranteContext())
                {
                    TipoUsuario oTipoUsuario = bd.TipoUsuario.Where(p => p.Iidtipousuario == idTipoUsuario).First();
                    oTipoUsuario.Bhabilitado = 0;
                    bd.SaveChanges();
                    rpta = 1;
                }
            }
            catch (Exception ex)
            {
                rpta = 0;
            }
            return rpta;
        }

        [HttpGet]
        [Route("api/TipoUsuario/listarPaginasRecuperar/{idTipoUsuario}")]
        public TipoUsuarioCLS listarPaginasRecuperar(int idTipoUsuario)
        {
            TipoUsuarioCLS oTipoUsuarioCLS = new TipoUsuarioCLS();
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<PaginaCLS> listaPaginas = (from tipoUsuario in bd.TipoUsuario
                                                join paginaTipoUsuario in bd.PaginaTipoUsuario
                                                on tipoUsuario.Iidtipousuario equals
                                                paginaTipoUsuario.Iidtipousuario
                                                join pagina in bd.Pagina
                                                on paginaTipoUsuario.Iidpagina equals
                                                pagina.Iidpagina
                                                where paginaTipoUsuario.Iidtipousuario == idTipoUsuario
                                                && paginaTipoUsuario.Bhabilitado == 1
                                                select new PaginaCLS
                                                {
                                                    idPagina = pagina.Iidpagina
                                                }).ToList();
                TipoUsuario oTipoUsuario = bd.TipoUsuario.Where(p => p.Iidtipousuario == idTipoUsuario).First();
                oTipoUsuarioCLS.idTipoUsuario = oTipoUsuario.Iidtipousuario;
                oTipoUsuarioCLS.nombre = oTipoUsuario.Nombre;
                oTipoUsuarioCLS.descripcion = oTipoUsuario.Descripcion;
                oTipoUsuarioCLS.listaPagina = listaPaginas;

                return oTipoUsuarioCLS;
            }
        }
    }
}