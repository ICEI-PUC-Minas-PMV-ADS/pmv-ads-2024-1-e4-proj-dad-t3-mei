using mei.Models;
using mei.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace mei.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicosController : ControllerBase
    {
        private readonly ServicosService _servicosService;
        public ServicosController(ServicosService servicosService)
        {
            _servicosService = servicosService;
        }
        [HttpGet]

        public async Task<List<Servico>> Get() =>
          await _servicosService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Servico>> GetById(string id)
        {
            var servico = await _servicosService.GetAsync(id);

            if (servico is null)
            {
                return NotFound();
            }

            return servico;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Servico newServico)
        {
            await _servicosService.CreateAsync(newServico);

            return CreatedAtAction("GetById", new { id = newServico.Id }, newServico);
        }
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Servico updatedServico)
        {
            var servico = await _servicosService.GetAsync(id);

            if (servico is null)
            {
                return NotFound();
            }

            updatedServico.Id = servico.Id;

            await _servicosService.UpdateAsync(id, updatedServico);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var servico = await _servicosService.GetAsync(id);

            if (servico is null)
            {
                return NotFound();
            }

            await _servicosService.RemoveAsync(id);

            return NoContent();
        }
    }
}
