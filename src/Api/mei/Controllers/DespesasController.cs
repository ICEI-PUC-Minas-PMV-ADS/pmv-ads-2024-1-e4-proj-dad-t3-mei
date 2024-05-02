using mei.Models;
using mei.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace mei.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DespesasController : ControllerBase
    {
        private readonly DespesasService _despesasService;
        public DespesasController(DespesasService despesasService)
        {
            _despesasService = despesasService;
        }
        [HttpGet]

        public async Task<List<Despesa>> Get() =>
          await _despesasService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Despesa>> GetById(string id)
        {
            var despesa = await _despesasService.GetAsync(id);

            if (despesa is null)
            {
                return NotFound();
            }

            return despesa;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Despesa newDespesa)
        {
            await _despesasService.CreateAsync(newDespesa);

            return CreatedAtAction("GetById", new { id = newDespesa.Id }, newDespesa);
        }
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Despesa updatedDespesa)
        {
            var despesa = await _despesasService.GetAsync(id);

            if (despesa is null)
            {
                return NotFound();
            }

            updatedDespesa.Id = despesa.Id;

            await _despesasService.UpdateAsync(id, updatedDespesa);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var despesa = await _despesasService.GetAsync(id);

            if (despesa is null)
            {
                return NotFound();
            }

            await _despesasService.RemoveAsync(id);

            return NoContent();
        }
    }
}
