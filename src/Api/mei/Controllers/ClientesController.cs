using mei.Models;
using mei.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace mei.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly ClientesService _clientesService;
        public ClientesController(ClientesService clientesService)
        {
            _clientesService = clientesService;
        }

        [HttpGet]

        public async Task<List<Cliente>> Get() =>
          await _clientesService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Cliente>> GetById(string id)
        {
            var cliente = await _clientesService.GetAsync(id);

            if (cliente is null)
            {
                return NotFound();
            }

            return cliente;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Cliente newCliente)
        {
            await _clientesService.CreateAsync(newCliente);

            return CreatedAtAction("GetById", new { id = newCliente.Id }, newCliente);
        }
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Cliente updatedCliente)
        {
            var cliente = await _clientesService.GetAsync(id);

            if (cliente is null)
            {
                return NotFound();
            }

            updatedCliente.Id = cliente.Id;

            await _clientesService.UpdateAsync(id, updatedCliente);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var cliente = await _clientesService.GetAsync(id);

            if (cliente is null)
            {
                return NotFound();
            }

            await _clientesService.RemoveAsync(id);

            return NoContent();
        }
    }
}
