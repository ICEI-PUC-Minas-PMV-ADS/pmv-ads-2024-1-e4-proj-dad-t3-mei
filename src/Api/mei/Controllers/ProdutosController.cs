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
    public class ProdutosController : ControllerBase
    {
        private readonly ProdutosService _produtosService;
        public ProdutosController(ProdutosService produtosService)
        {
            _produtosService = produtosService;
        }
        [HttpGet]

        public async Task<List<Produto>> Get() =>
          await _produtosService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Produto>> GetById(string id)
        {
            var produto = await _produtosService.GetAsync(id);

            if (produto is null)
            {
                return NotFound();
            }

            return produto;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Produto newProduto)
        {
            await _produtosService.CreateAsync(newProduto);

            return CreatedAtAction("GetById", new { id = newProduto.Id }, newProduto);
        }
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Produto updatedProduto)
        {
            var produto = await _produtosService.GetAsync(id);

            if (produto is null)
            {
                return NotFound();
            }

            updatedProduto.Id = produto.Id;

            await _produtosService.UpdateAsync(id, updatedProduto);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var produto = await _produtosService.GetAsync(id);

            if (produto is null)
            {
                return NotFound();
            }

            await _produtosService.RemoveAsync(id);

            return NoContent();
        }
    }
}
