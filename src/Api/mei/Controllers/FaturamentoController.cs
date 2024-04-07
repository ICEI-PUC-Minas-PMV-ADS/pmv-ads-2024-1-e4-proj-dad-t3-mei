using Amazon.Runtime.Internal.Endpoints.StandardLibrary;
using mei.Models;
using mei.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace mei.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FaturamentosController : ControllerBase
    {
        private readonly FaturamentosService _faturamentosService;
        public FaturamentosController(FaturamentosService faturamentosService)
        {
            _faturamentosService = faturamentosService;
        }
        [HttpGet]

        public async Task<List<Faturamento>> Get() =>
          await _faturamentosService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Faturamento>> GetById(string id)
        {
            var faturamento = await _faturamentosService.GetAsync(id);

            if (faturamento is null)
            {
                return NotFound();
            }
            return faturamento;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Faturamento newFaturamento)
        {
            await _faturamentosService.CreateAsync(newFaturamento);

            return CreatedAtAction("GetById", new { id = newFaturamento.Id }, newFaturamento);
        }
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Faturamento updatedFaturamento)
        {
            var faturamento = await _faturamentosService.GetAsync(id);

            if (faturamento is null)
            {
                return NotFound();
            }

            updatedFaturamento.Id = faturamento.Id;

            await _faturamentosService.UpdateAsync(id, updatedFaturamento);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var faturamento = await _faturamentosService.GetAsync(id);

            if (faturamento is null)
            {
                return NotFound();
            }

            await _faturamentosService.RemoveAsync(id);

            return NoContent();
        }
    }


}
