using Alset.Entity;
using Alset.Entity.Entities;
using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Alset.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UploadController : ControllerBase
    {
        private AlsetContext _context;
        public UploadController(AlsetContext context)
        {
            _context = context;
        }


        [HttpPut("{tipo}/{id}")]
        public Task<bool> UploadFile(string tipo,string id)
        {
            //Variable que retorna el valor del resultado del metodo
            //El valor predeterminado es Falso (false)
            bool resultado = false;

            //La variable "file" recibe el archivo en el objeto Request.Form
            //Del POST que realiza la aplicacion a este servicio.
            //Se envia un formulario completo donde uno de los valores es el archivo
            var file = Request.Form.Files[0];

            //Variable donde se coloca la ruta relativa de la carpeta de destino
            //del archivo cargado
            string NombreCarpeta = "Archivos/";

            //Variable donde se coloca la ruta raíz de la aplicacion
            //para esto se emplea la variable "_env" antes de declarada
            

            //Se concatena las variables "RutaRaiz" y "NombreCarpeta"
            //en una otra variable "RutaCompleta"
            string RutaCompleta = NombreCarpeta + tipo;


            //Se valida con la variable "RutaCompleta" si existe dicha carpeta            
            if (!Directory.Exists(RutaCompleta))
            {
                //En caso de no existir se crea esa carpeta
                Directory.CreateDirectory(RutaCompleta);
            }

            //Se valida si la variable "file" tiene algun archivo
            if (file.Length > 0)
            {
                //Se declara en esta variable el nombre del archivo cargado
                string NombreArchivo = file.FileName;

                //Se declara en esta variable la ruta completa con el nombre del archivo
                string RutaFullCompleta = Path.Combine(RutaCompleta, NombreArchivo);

                //Se crea una variable FileStream para carlo en la ruta definida
                using (var stream = new FileStream(RutaFullCompleta, FileMode.Create))
                {
                    file.CopyTo(stream);

                    //Como se cargo correctamente el archivo
                    //la variable "resultado" llena el valor "true"
                    resultado = true;
                }

                var journal = _context.Journals.Where(e => e.Id == int.Parse(tipo)).First();
                if (journal != null)
                {
                    journal.Pdf = RutaFullCompleta;
                    //journal.JournalistId = request.JournalistId;
                    _context.SaveChanges();
                }

            }

            //Se retorna la variable "resultado" como resultado de una tarea
            return Task.FromResult(resultado);

        }
    }
}
