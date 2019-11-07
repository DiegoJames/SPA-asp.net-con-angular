using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiPrimeraAppAngular.Clases
{
    public class PersonaCLS
    {
        public int idPersona { get; set; }
        public string nombreCompleto { get; set; }
        public string telefono { get; set; }
        public string correo { get; set; }
        public DateTime fechaNacimiento { get; set; }
        public int bHabilitado { get; set; }
        //Propiedades adicionales
        public string nombre { get; set; }
        public string apPaterno { get; set; }
        public string apMaterno { get; set; }

        public string fechaCadena { get; set; }

    }
}
