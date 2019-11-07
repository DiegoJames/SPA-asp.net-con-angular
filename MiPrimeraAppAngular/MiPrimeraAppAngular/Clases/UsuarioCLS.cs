using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiPrimeraAppAngular.Clases
{
    public class UsuarioCLS
    {
        public int idUsuario { get; set; }
        public string nombreUsuario { get; set; }
        public string nombrePersona { get; set; }
        public int bHabilitado { get; set; }
        public string nombreTipoUsuario { get; set; }

        public int idPersona { get; set; }
        public int idTipoUsuario { get; set; }

        public int contra { get; set; }

        public string contra2 { get; set; }
    }
}
