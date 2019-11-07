using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using MiPrimeraAppAngular.Clases;
using MiPrimeraAppAngular.Models;
using Microsoft.AspNetCore.Session;
using Microsoft.AspNetCore.Http;

namespace MiPrimeraAppAngular.Controllers
{
    public class UsuarioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/Usuario/listarTipoUsuario")]
        public IEnumerable<TipoUsuarioCLS> listarTipoUsuario()
        {
            using(BDRestauranteContext bd=new BDRestauranteContext())
            {
                List<TipoUsuarioCLS> listaTipoUsuario = (from tipoUsuario in bd.TipoUsuario
                                                         where tipoUsuario.Bhabilitado == 1
                                                         select new TipoUsuarioCLS
                                                         {
                                                             idTipoUsuario = tipoUsuario.Iidtipousuario,
                                                             nombre = tipoUsuario.Nombre
                                                         }).ToList();
                return listaTipoUsuario;
            }
        }

        [HttpGet]
        [Route("api/Usuario/validarUsuario/{idUsuario}/{nombre}")]
        public int validarUsuario(int idUsuario, string nombre)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    if (idUsuario == 0)
                    {
                        rpta = bd.Usuario.Where(p => p.Nombreusuario.ToLower() == nombre.ToLower()).Count();
                    }
                    else
                    {
                        rpta = bd.Usuario.Where(p => p.Nombreusuario.ToLower() == nombre.ToLower() && p.Iidusuario != idUsuario).Count();
                    }
                }   
             
            }catch(Exception ex)
            {
                return 0;
            }
            return rpta;
        }


        [HttpGet]
        [Route("api/Usuario/listarPaginas")]
        public List<PaginaCLS> listarPaginas()
        {
            List<PaginaCLS> listaPagina = new List<PaginaCLS>();
            int idTipoUsuario = int.Parse(HttpContext.Session.GetString("tipoUsuario"));
            using(BDRestauranteContext bd=new BDRestauranteContext())
            {
                listaPagina = (from paginaTipo in bd.PaginaTipoUsuario
                               join pagina in bd.Pagina
                               on paginaTipo.Iidpagina equals pagina.Iidpagina
                               where paginaTipo.Bhabilitado == 1
                               && paginaTipo.Iidtipousuario == idTipoUsuario
                               && pagina.Bvisible == 1
                               select new PaginaCLS
                               {
                                   idPagina = pagina.Iidpagina,
                                   accion = pagina.Accion,
                                   mensaje = pagina.Mensaje,
                                   bHabilitado = (int)pagina.Bhabilitado
                               }).ToList();
                return listaPagina;
            }
        }

        [HttpGet]
        [Route("api/Usuario/cerrarSesion")]
        public SeguridadCLS cerrarSesion()
        {
            SeguridadCLS oSeguridadCls = new SeguridadCLS();
            try
            {
                HttpContext.Session.Remove("usuario");
                HttpContext.Session.Remove("tipoUsuario");
                oSeguridadCls.valor = "OK";
            }
            catch (Exception ex)
            {
                oSeguridadCls.valor = "";
            }

            return oSeguridadCls;
        }

        [HttpPost]
        [Route("api/Usuario/login")]
        public UsuarioCLS login([FromBody] UsuarioCLS oUsuarioCls)
        {
            int rpta = 0;
            UsuarioCLS oUsuario = new UsuarioCLS();
            using (BDRestauranteContext bd=new BDRestauranteContext())
            {
                SHA256Managed sha = new SHA256Managed();
                byte[] dataNoCifrada = Encoding.Default.GetBytes(oUsuarioCls.contra.ToString());
                byte[] dataCifrada = sha.ComputeHash(dataNoCifrada);
                string claveCifrada = BitConverter.ToString(dataCifrada).Replace("-", "");
                rpta = bd.Usuario.Where(p => p.Nombreusuario.ToUpper() == oUsuarioCls.nombreUsuario.ToUpper() && p.Contra == claveCifrada).Count();
                if (rpta == 1)
                {
                    Usuario oUsuarioRecuperar = bd.Usuario.Where(p => p.Nombreusuario.ToUpper() == oUsuarioCls.nombreUsuario.ToUpper() && p.Contra == claveCifrada).First();
                    HttpContext.Session.SetString("usuario", oUsuarioRecuperar.Iidusuario.ToString());
                    HttpContext.Session.SetString("tipoUsuario", oUsuarioRecuperar.Iidtipousuario.ToString());
                    oUsuario.idUsuario = oUsuarioRecuperar.Iidusuario;
                    oUsuario.nombreUsuario = oUsuarioRecuperar.Nombreusuario;
                }
                else
                {
                    oUsuario.idUsuario = 0;
                    oUsuario.nombreUsuario = "";
                }
            }

            return oUsuario;
        }

        [HttpGet]
        [Route("api/Usuario/obtenerVariableSession")]
        public SeguridadCLS obtenerVariableSession() {

            SeguridadCLS oSeguridadCls = new SeguridadCLS();
            string variableSession = HttpContext.Session.GetString("usuario");
            if(variableSession == null)
            {
                oSeguridadCls.valor = "";

            }
            else
            {
                oSeguridadCls.valor = variableSession;
                List<PaginaCLS> listaPaginas = new List<PaginaCLS>();
                int idUsuario = int.Parse(HttpContext.Session.GetString("usuario"));
                int idTipoUsuario = int.Parse(HttpContext.Session.GetString("tipoUsuario"));
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    listaPaginas = (from usuario in bd.Usuario
                                     join tipoUsuario in bd.TipoUsuario
                                     on usuario.Iidtipousuario equals
                                     tipoUsuario.Iidtipousuario
                                     join paginaTipo in bd.PaginaTipoUsuario
                                     on usuario.Iidtipousuario equals paginaTipo.Iidtipousuario
                                     join pagina in bd.Pagina
                                     on paginaTipo.Iidpagina equals pagina.Iidpagina
                                     where usuario.Iidusuario == idUsuario
                                     && usuario.Iidtipousuario == idTipoUsuario
                                     && paginaTipo.Bhabilitado==1
                                     select new PaginaCLS
                                     {
                                         accion = pagina.Accion.Substring(1)
                                     }).ToList();
                    oSeguridadCls.lista = listaPaginas;
                }
                }
            return oSeguridadCls;
        }

        [HttpGet]
        [Route("api/Usuario/eliminarUsuario/{idUsuario}")]
        public int eliminarUsuario(int idUsuario)
        {
            int rpta = 0;
            try
            {
                using(BDRestauranteContext bd = new BDRestauranteContext())
                {
                    Usuario oUsuario = bd.Usuario.Where(p => p.Iidusuario == idUsuario).First();
                    oUsuario.Bhabilitado = 0;
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

        [HttpPost]
        [Route("api/Usuario/guardarDatos")]
        public int guardarDatos([FromBody] UsuarioCLS oUsuarioCLS)
        {
            int rpta = 0;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    using (var transaccion = new TransactionScope())
                    {
                        if (oUsuarioCLS.idUsuario == 0)
                        {
                            // Agregar Usuario
                            Usuario oUsuario = new Usuario();
                            oUsuario.Nombreusuario = oUsuarioCLS.nombreUsuario;
                            // Cifrar contrasena
                            SHA256Managed sha = new SHA256Managed();
                            string clave = oUsuarioCLS.contra.ToString();
                            byte[] dataNoCifrada = Encoding.Default.GetBytes(clave);
                            byte[] dataCifrada = sha.ComputeHash(dataNoCifrada);
                            string claveCifrada = BitConverter.ToString(dataCifrada).Replace("-","");
                            oUsuario.Contra = claveCifrada;
                            oUsuario.Iidpersona = oUsuarioCLS.idPersona;
                            oUsuario.Iidtipousuario = oUsuarioCLS.idTipoUsuario;
                            oUsuario.Bhabilitado = 1;
                            bd.Usuario.Add(oUsuario);
                            // Modificar Persona(btieneUsuario de 0 a 1)

                            Persona oPersona = bd.Persona.Where(p => p.Iidpersona == oUsuarioCLS.idPersona).First();
                            oPersona.Btieneusuario = 1;
                            bd.SaveChanges();
                            transaccion.Complete();
                            rpta = 1;
                        }
                        else
                        {
                            // Editar
                            Usuario oUsuario = bd.Usuario.Where(p => p.Iidusuario == oUsuarioCLS.idUsuario).First();
                            oUsuario.Nombreusuario = oUsuarioCLS.nombreUsuario;
                            oUsuario.Iidtipousuario = oUsuarioCLS.idTipoUsuario;
                            bd.SaveChanges();
                            transaccion.Complete();
                            rpta = 1;
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                return 0;
            }
            return rpta;
        }

        [HttpGet]
        [Route("api/Usuario/recuperarUsuario/{idUsuario}")]
        public UsuarioCLS recuperarUsuario(int idUsuario)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                UsuarioCLS oUsuarioCLS = new UsuarioCLS();
                Usuario oUsuario = bd.Usuario.Where(p => p.Iidusuario == idUsuario).First();

                oUsuarioCLS.idUsuario = oUsuario.Iidusuario;
                oUsuarioCLS.nombreUsuario = oUsuario.Nombreusuario;
                oUsuarioCLS.idTipoUsuario = (int)oUsuario.Iidtipousuario;

                return oUsuarioCLS;
            }
        }


        [HttpGet]
        [Route("api/Usuario/listarUsuario")]
        public IEnumerable<UsuarioCLS> listarUsuario()
        {
            using(BDRestauranteContext bd=new BDRestauranteContext())
            {
                List<UsuarioCLS> listaUsuario = (from usuario in bd.Usuario
                                                 join persona in bd.Persona
                                                 on usuario.Iidpersona equals persona.Iidpersona
                                                 join tipoUsuario in bd.TipoUsuario
                                                 on usuario.Iidtipousuario equals tipoUsuario.Iidtipousuario
                                                 where usuario.Bhabilitado == 1
                                                 select new UsuarioCLS
                                                 {
                                                     idUsuario = usuario.Iidusuario,
                                                     nombreUsuario = usuario.Nombreusuario,
                                                     nombrePersona = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                                     nombreTipoUsuario = tipoUsuario.Nombre

                                                 }).ToList();
                return listaUsuario;
            }
        }

        [HttpGet]
        [Route("api/Usuario/filtrarUsuarioPorTipo/{idTipo?}")]
        public IEnumerable<UsuarioCLS> filtrarUsuarioPorTipo(int idTipo=0)
        {
            using(BDRestauranteContext bd=new BDRestauranteContext())
            {
                List<UsuarioCLS> listaUsuario = (from usuario in bd.Usuario
                                                 join persona in bd.Persona
                                                 on usuario.Iidpersona equals persona.Iidpersona
                                                 join tipoUsuario in bd.TipoUsuario
                                                 on usuario.Iidtipousuario equals tipoUsuario.Iidtipousuario
                                                 where usuario.Bhabilitado == 1
                                                 && usuario.Iidtipousuario== idTipo
                                                 select new UsuarioCLS
                                                 {
                                                     idUsuario = usuario.Iidusuario,
                                                     nombreUsuario = usuario.Nombreusuario,
                                                     nombrePersona = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                                     nombreTipoUsuario = tipoUsuario.Nombre

                                                 }).ToList();
                return listaUsuario;
            }
        }
    }
}