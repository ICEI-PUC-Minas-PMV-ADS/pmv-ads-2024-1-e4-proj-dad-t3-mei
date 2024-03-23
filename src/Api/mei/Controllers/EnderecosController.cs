using mei.Models;
using mei.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace mei.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnderecosController : ControllerBase
    {
        private readonly EnderecosService _enderecosService;
        public EnderecosController(EnderecosService enderecosService)
        {
            _enderecosService = enderecosService;
        }
        [HttpGet]

        public async Task<List<Endereco>> Get() =>
          await _enderecosService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Endereco>> GetById(string id)
        {
            var endereco = await _enderecosService.GetAsync(id);

            if (endereco is null)
            {
                return NotFound();
            }

            return endereco;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Endereco newEndereco)
        {
            await _enderecosService.CreateAsync(newEndereco);

            return CreatedAtAction("GetById", new { id = newEndereco.Id }, newEndereco);
        }
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Endereco updatedEndereco)
        {
            var endereco = await _enderecosService.GetAsync(id);

            if (endereco is null)
            {
                return NotFound();
            }

            updatedEndereco.Id = endereco.Id;

            await _enderecosService.UpdateAsync(id, updatedEndereco);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var endereco = await _enderecosService.GetAsync(id);

            if (endereco is null)
            {
                return NotFound();
            }

            await _enderecosService.RemoveAsync(id);

            return NoContent();
        }
    }
}
