using System.ComponentModel.DataAnnotations;

namespace ML
{
    public class Usuario
    {
        //Propiedades
        public int? IdUsuario { get; set; }
        public string? UserName { get; set; }
        public string? Nombre { get; set; }
        public string? ApellidoPaterno { get; set; }
        public string? ApellidoMaterno { get; set; }
        public string? Email { get; set; } 
        public string? Passwrd { get; set; }
        public string? Sexo { get; set; }
        public string? Telefono { get; set; }
        public string? Celular { get; set; }
        public string? FechaNacimiento { get; set; }
        public string? CURP { get; set; }
        public Rol? Rol { get; set; } //Propiedad de navegación.
        public List<object>? Usuarios { get; set; }
    }
}
