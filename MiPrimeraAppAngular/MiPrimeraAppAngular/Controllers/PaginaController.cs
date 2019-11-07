﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAppAngular.Clases;
using MiPrimeraAppAngular.Models;

namespace MiPrimeraAppAngular.Controllers
{
    public class PaginaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/Pagina/listarPaginasBD")]
        public List<PaginaCLS> listarPaginasBD()
        {
            List<PaginaCLS> listaPagina = new List<PaginaCLS>();
            using(BDRestauranteContext bd=new BDRestauranteContext())
            {
                listaPagina = (from pagina in bd.Pagina
                               where pagina.Bhabilitado == 1
                               select new PaginaCLS
                               {
                                   idPagina = pagina.Iidpagina,
                                   mensaje = pagina.Mensaje,
                                   accion = pagina.Accion
                               }).ToList();
            }


            return listaPagina;
        }

        [HttpPost]
        [Route("api/Pagina/guardarPagina")]
        public int guardarPagina([FromBody] PaginaCLS oPaginaCLS)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    if (oPaginaCLS.idPagina==0)
                    {
                        Pagina oPagina = new Pagina();
                        oPagina.Accion = oPaginaCLS.accion;
                        oPagina.Mensaje = oPaginaCLS.mensaje;
                        oPagina.Bvisible = oPaginaCLS.bVisible;
                        oPagina.Bhabilitado = 1;
                        bd.Pagina.Add(oPagina);
                        bd.SaveChanges();
                        rpta = 1;
                    }
                    else
                    {
                        Pagina oPagina = bd.Pagina.Where(p => p.Iidpagina == oPaginaCLS.idPagina).First();
                        oPagina.Accion= oPaginaCLS.accion;
                        oPagina.Mensaje = oPaginaCLS.mensaje;
                        oPagina.Bvisible = oPaginaCLS.bVisible;
                        bd.SaveChanges();
                        rpta = 1;
                    }
                }
            }catch(Exception ex)
            {
                rpta = 0;
            }
            return rpta;
        }

        [HttpGet]
        [Route("api/Pagina/recuperarPagina/{idPagina}")]
        public PaginaCLS recuperarPagina(int idPagina)
        {
            PaginaCLS oPaginaCLS = new PaginaCLS();
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    oPaginaCLS = (from pagina in bd.Pagina
                                  where pagina.Bhabilitado == 1 && pagina.Iidpagina== idPagina
                                  select new PaginaCLS
                                  {
                                      idPagina = pagina.Iidpagina,
                                      accion = pagina.Accion,
                                      mensaje = pagina.Mensaje,
                                      bVisible = (int)pagina.Bvisible
                                  }).First();

                }
            }
            catch (Exception ex)
            {
                oPaginaCLS.accion = null;
            }
            return oPaginaCLS;
        }

        [HttpGet]
        [Route("api/Pagina/eliminarPagina/{idPagina}")]
        public int eliminarPagina(int idPagina)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    Pagina oPagina = bd.Pagina.Where(p => p.Iidpagina == idPagina).First();
                    oPagina.Bhabilitado = 1;
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
    }
}