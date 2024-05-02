using mei.Models;
using mei.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace mei.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MeisController : ControllerBase
    {
        private readonly MeisService _meisService;
        public MeisController(MeisService meisService)
        {
            _meisService = meisService;
        }
        [HttpGet]
        public async Task<List<Mei>> Get() =>
          await _meisService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Mei>> GetById(string id)
        {
            var mei = await _meisService.GetAsync(id);

            if (mei is null)
            {
                return NotFound();
            }

            return mei;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Mei newMei)
        {
            await _meisService.CreateAsync(newMei);

            return CreatedAtAction("GetById", new { id = newMei.Id }, newMei);
        }
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Mei updatedMei)
        {
            var mei = await _meisService.GetAsync(id);

            if (mei is null)
            {
                return NotFound();
            }

            updatedMei.Id = mei.Id;

            await _meisService.UpdateAsync(id, updatedMei);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var mei = await _meisService.GetAsync(id);

            if (mei is null)
            {
                return NotFound();
            }

            await _meisService.RemoveAsync(id);

            return NoContent();
        }
    }
}
