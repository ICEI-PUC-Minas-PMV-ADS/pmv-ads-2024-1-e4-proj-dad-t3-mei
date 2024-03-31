using mei.Models;
using mei.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace mei.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
            private readonly UsuariosService _usuariosService;
            public UsuariosController(UsuariosService usuariosService)
            {
                _usuariosService = usuariosService;
            }
            [HttpGet]
            public async Task<List<Usuario>> Get() =>
              await _usuariosService.GetAsync();

            [HttpGet("{id:length(24)}")]
            public async Task<ActionResult<Usuario>> GetById(string id)
            {
                var user = await _usuariosService.GetAsync(id);

                if (user is null)
                {
                    return NotFound();
                }

                return user;
            }

            [HttpPost]
            public async Task<IActionResult> Post(Usuario newUser)
            {
                await _usuariosService.CreateAsync(newUser);

                return CreatedAtAction("GetById", new { id = newUser.Id }, newUser);
            }
            [HttpPut("{id:length(24)}")]
            public async Task<IActionResult> Update(string id, Usuario updatedUser)
            {
                var user = await _usuariosService.GetAsync(id);

                if (user is null)
                {
                    return NotFound();
                }

                updatedUser.Id = user.Id;

                await _usuariosService.UpdateAsync(id, updatedUser);

                return NoContent();
            }

            [HttpDelete("{id:length(24)}")]
            public async Task<IActionResult> Delete(string id)
            {
                var user = await _usuariosService.GetAsync(id);

                if (user is null)
                {
                    return NotFound();
                }

                await _usuariosService.RemoveAsync(id);

                return NoContent();
            }
        
    }

}

