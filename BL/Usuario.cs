using Microsoft.EntityFrameworkCore;

namespace BL
{
    public class Usuario
    {
        //Declaro mi instancia
        private readonly DL.MrodriguezProgramacionNcapasContext _context;

        //Metódo constructor
        public Usuario(DL.MrodriguezProgramacionNcapasContext context)
        {
            _context = context;
        }
        public ML.Result GetAll()
        {
            ML.Result resultGetAll = new ML.Result();

            try
            {
                //Instancia del DL (_context)
                List<DL.Usuario> ListaUsuarios = (from UsuarioDB in _context.Usuarios
                                                  select UsuarioDB).ToList();

                if (ListaUsuarios.Count > 0)
                {
                    resultGetAll.Objects = new List<object>();

                    foreach (DL.Usuario user in ListaUsuarios)
                    {
                        ML.Usuario usuario = new ML.Usuario();

                        usuario.IdUsuario = user.IdUsuario;
                        usuario.UserName = user.UserName;
                        usuario.Nombre = user.Nombre;
                        usuario.ApellidoPaterno = user.ApellidoPaterno;
                        usuario.ApellidoMaterno = user.ApellidoMaterno;
                        usuario.Email = user.Email;
                        usuario.Passwrd = user.Passwrd;
                        usuario.Sexo = user.Sexo;
                        usuario.Telefono = user.Telefono;
                        usuario.Celular = user.Celular;
                        usuario.FechaNacimiento = user.FechaNacimiento.ToString();
                        usuario.CURP = user.Curp;

                        usuario.Rol = new ML.Rol();
                        usuario.Rol.IdRol = user.IdRol.Value;

                        resultGetAll.Objects.Add(usuario);
                    }

                    resultGetAll.Correct = true;

                }

            }
            catch (Exception ex)
            {
                resultGetAll.ErrorMessage = ex.Message;
                resultGetAll.Correct = false;
                resultGetAll.Exception = ex;

            }

            return resultGetAll;
        }

        public ML.Result GetById(int IdUsuario)
        {
            ML.Result resultGetById = new ML.Result();

            try
            {
                object Usuario = (from UsuarioBD in _context.Usuarios
                                  join RolBD in _context.Rols on UsuarioBD.IdRol equals RolBD.IdRol //recupero los roles de mi usuario
                                  where UsuarioBD.IdUsuario == IdUsuario
                                  select UsuarioBD).SingleOrDefault();

                if (Usuario != null)
                {
                    resultGetById.Object = Usuario;
                    resultGetById.Correct = true;
                }

            }
            catch (Exception ex)
            {
                resultGetById.ErrorMessage = ex.Message;
                resultGetById.Correct = false;
                resultGetById.Exception = ex;

            }

            return resultGetById;
        }

        public ML.Result AddSPEF(ML.Usuario usuario)
        {
            ML.Result resultAdd = new ML.Result();

            try
            {
                #region Stored Procedure
                int queryAddList = _context.Database.ExecuteSqlInterpolated($@"
                        EXECUTE UsuarioAdd 
                            @UserName = {usuario.UserName},
                            @Nombre = {usuario.Nombre},
                            @ApellidoPaterno = {usuario.ApellidoPaterno},
                            @ApellidoMaterno = {usuario.ApellidoMaterno},
                            @Email = {usuario.Email},
                            @Passwrd = {usuario.Passwrd},
                            @Sexo = {usuario.Sexo},
                            @Telefono = {usuario.Telefono},
                            @Celular = {usuario.Celular},
                            @FechaNacimiento = {usuario.FechaNacimiento},
                            @Curp = {usuario.CURP},
                            @IdRol = {usuario.Rol.IdRol}
                        ");
                #endregion

                if (queryAddList > 0)
                {
                    resultAdd.Correct = true;
                }
            }
            catch (Exception ex)
            {
                resultAdd.Correct = false;
                resultAdd.ErrorMessage = ex.Message;
                resultAdd.Exception = ex;

            }

            return resultAdd;
        }

        public ML.Result UpdateSPEF(ML.Usuario usuario)
        {
            ML.Result resultUpdate = new ML.Result();

            try
            {
                #region Stored Procedure
                int queryUpdateList = _context.Database.ExecuteSqlInterpolated($@"
                        EXECUTE UsuarioUpdate
                            @IdUsuario = {usuario.IdUsuario},
                            @UserName = {usuario.UserName},
                            @Nombre = {usuario.Nombre},
                            @ApellidoPaterno = {usuario.ApellidoPaterno},
                            @ApellidoMaterno = {usuario.ApellidoMaterno},
                            @Email = {usuario.Email},
                            @Passwrd = {usuario.Passwrd},
                            @Sexo = {usuario.Sexo},
                            @Telefono = {usuario.Telefono},
                            @Celular = {usuario.Celular},
                            @FechaNacimiento = {usuario.FechaNacimiento},
                            @Curp = {usuario.CURP},
                            @IdRol = {usuario.Rol.IdRol}
                        ");
                #endregion

                if (queryUpdateList > 0)
                {
                    resultUpdate.Correct = true;
                }
            }
            catch (Exception ex)
            {
                resultUpdate.Correct = false;
                resultUpdate.ErrorMessage = ex.Message;
                resultUpdate.Exception = ex;

            }

            return resultUpdate;
        }

        public ML.Result DeleteSPEF(int IdUsuario)
        {
            ML.Result resultDelete = new ML.Result();

            try
            {
                int DeleteUser = _context.Database.ExecuteSqlInterpolated($@"
                    EXECUTE UsuarioDelete
                        @IdUsuario = {IdUsuario}
                    ");

                if (DeleteUser > 0)
                {
                    resultDelete.Correct = true;
                }
            }
            catch (Exception ex)
            {
                resultDelete.Correct = false;
                resultDelete.ErrorMessage = ex.Message;
                resultDelete.Exception = ex;
            }

            return resultDelete;
        }
    }
}
