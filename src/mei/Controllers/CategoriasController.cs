using mei.Models;
using mei.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mei.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriasController : ControllerBase
    {
        private readonly CategoriasService _categoriasService;
        public CategoriasController(CategoriasService categoriasService)
        {
            _categoriasService = categoriasService;
        }
        [HttpGet]

        public async Task<List<Categoria>> Get() =>
          await _categoriasService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Categoria>> GetById(string id)
        {
            var categoria = await _categoriasService.GetAsync(id);

            if (categoria is null)
            {
                return NotFound();
            }

            return categoria;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Categoria newCategoria)
        {
            await _categoriasService.CreateAsync(newCategoria);

            return CreatedAtAction("GetById", new { id = newCategoria.Id }, newCategoria);
        }
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Categoria updatedCategoria)
        {
            var categoria = await _categoriasService.GetAsync(id);

            if (categoria is null)
            {
                return NotFound();
            }

            updatedCategoria.Id = categoria.Id;

            await _categoriasService.UpdateAsync(id, updatedCategoria);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var categoria = await _categoriasService.GetAsync(id);

            if (categoria is null)
            {
                return NotFound();
            }

            await _categoriasService.RemoveAsync(id);

            return NoContent();
        }
    }
}
