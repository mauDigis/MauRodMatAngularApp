using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MauRodMatAngularApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly BL.Usuario _usuario;

        //Constructor
        public UsuarioController(BL.Usuario usuario)
        {
            this._usuario = usuario;
        }

        [HttpGet]
        [Route("GetAll")]
        public IActionResult GetAll()
        {
            ML.Result resultGetAll = _usuario.GetAll();

            if (resultGetAll.Correct == true)
            {
                return StatusCode(200, resultGetAll.Objects);
            }
            else
            {
                return BadRequest();
            }

        }

        [HttpGet]
        [Route("GetById")]
        public IActionResult GetById(int IdUsuario)
        {
            ML.Result resultGetById = _usuario.GetById(IdUsuario);

            if (resultGetById.Correct == true)
            {
                return StatusCode(200, resultGetById.Object);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("Add")]
        public IActionResult Add(ML.Usuario usuario)
        {
            ML.Result resultAdd = _usuario.AddSPEF(usuario);

            if (resultAdd.Correct == true)
            {
                return StatusCode(200, resultAdd);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("Update")]
        public IActionResult Update(ML.Usuario usuario)
        {
            ML.Result resultUpdate = _usuario.UpdateSPEF(usuario);

            if (resultUpdate.Correct == true)
            {
                return StatusCode(200, resultUpdate);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("Delete")]
        public IActionResult Delete(int IdUsuario)
        {
            ML.Result resultDelete = _usuario.DeleteSPEF(IdUsuario);

            if (resultDelete.Correct == true)
            {
                return StatusCode(200, resultDelete);
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
