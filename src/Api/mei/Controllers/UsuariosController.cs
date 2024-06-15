using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using mei.Models;
using mei.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson.IO;

namespace mei.Controllers
{
    [Authorize]
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
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Post(Usuario newUser)
        {
            // Verifique se já existe um usuário com o mesmo e-mail
            var existingUser = await _usuariosService.GetByEmailAsync(newUser.Email);
            if (existingUser != null)
            {
                return BadRequest("Um usuário com o mesmo e-mail já existe");
            }

            // Criptografe a senha antes de salvar
            newUser.Senha = BCrypt.Net.BCrypt.HashPassword(newUser.Senha);

            await _usuariosService.CreateAsync(newUser);
            var jwtToken = GenerateJwtToken(newUser);

            return CreatedAtAction("GetById", new { id = newUser.Id }, new { user = newUser, token = jwtToken });
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Usuario updatedUser)
        {
            try
            {
                var user = await _usuariosService.GetAsync(id);

                if (user is null)
                {
                    return NotFound();
                }

                // Verifique se o email foi fornecido e se já está em uso por outro usuário
                if (!string.IsNullOrEmpty(updatedUser.Email) && updatedUser.Email != user.Email)
                {
                    var existingUser = await _usuariosService.GetByEmailAsync(updatedUser.Email);
                    if (existingUser != null)
                    {
                        return BadRequest("Um usuário com este email já existe.");
                    }
                    user.Email = updatedUser.Email;
                }

                // Atualize o campo Nome se ele foi fornecido
                if (!string.IsNullOrEmpty(updatedUser.Nome))
                {
                    user.Nome = updatedUser.Nome;
                }

                // Atualize o campo Cnpj se ele foi fornecido
                if (!string.IsNullOrEmpty(updatedUser.Cnpj))
                {
                    user.Cnpj = updatedUser.Cnpj;
                }

                // Atualize a senha apenas se uma nova senha foi fornecida
                if (!string.IsNullOrEmpty(updatedUser.Senha))
                {
                    user.Senha = BCrypt.Net.BCrypt.HashPassword(updatedUser.Senha);
                }

                await _usuariosService.UpdateAsync(id, user);


                return NoContent();
            }
            catch (Exception ex)
            {
                // Log the exception details
                Console.WriteLine($"Error updating user: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
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

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<ActionResult> Authenticate(AuthenticateDto model)
        {
            var user = await _usuariosService.GetByEmailAsync(model.Email);

            if (user == null)
            {
                Console.WriteLine("Usuário não encontrado.");
                return Unauthorized();
            }

            if (string.IsNullOrEmpty(user.Senha) || string.IsNullOrEmpty(model.Senha))
            {
                Console.WriteLine("Senha do usuário ou senha fornecida é nula ou vazia.");
                return Unauthorized();
            }

            // Verifique se a senha fornecida corresponde à senha armazenada no banco de dados
            if (!BCrypt.Net.BCrypt.Verify(model.Senha, user.Senha))
            {
                Console.WriteLine("Senha incorreta.");
                return Unauthorized();
            }

            var jwt = GenerateJwtToken(user);

            return Ok(new { jwtToken = jwt });
        }


        private string GenerateJwtToken(Usuario model)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("S3nh4Mu1t0P0d3r0s4S3cr3t4Cu1d4d0");
            var claims = new ClaimsIdentity(new Claim[]
            {
        new Claim(ClaimTypes.NameIdentifier, model.Id.ToString()),
            });
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}


