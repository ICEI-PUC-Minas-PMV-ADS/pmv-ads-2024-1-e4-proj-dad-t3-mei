using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using mei.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;

namespace mei.Services
{
    public class UsuariosService
    {
        private readonly IMongoCollection<Usuario> _usuariosCollection;

        public UsuariosService(
            IOptions<DatabaseSettings> meiDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                meiDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(
                meiDatabaseSettings.Value.DatabaseName);
            _usuariosCollection = mongoDatabase.GetCollection<Usuario>(
                meiDatabaseSettings.Value.UsuariosCollectionName);
        }
        public async Task<List<Usuario>> GetAsync() =>
            await _usuariosCollection.Find(_ => true).ToListAsync();
        public async Task<Usuario?> GetAsync(string id) =>
        await _usuariosCollection
            .Find(x => x.Id == id)
            .FirstOrDefaultAsync();

        public async Task CreateAsync(Usuario newUsuario) =>
            await _usuariosCollection.InsertOneAsync(newUsuario);

        public async Task UpdateAsync(string id, Usuario updatedUsuario) =>
            await _usuariosCollection.ReplaceOneAsync(x => x.Id == id, updatedUsuario);

        public async Task RemoveAsync(string id) =>
            await _usuariosCollection.DeleteOneAsync(x => x.Id == id);

        public async Task<Usuario> GetByEmailAsync(string email)
        {
            return await _usuariosCollection.Find<Usuario>(usuario => usuario.Email == email).FirstOrDefaultAsync();
        }
    }
}
