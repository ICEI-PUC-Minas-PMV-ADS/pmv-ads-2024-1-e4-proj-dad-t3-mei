using mei.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace mei.Services
{
    public class ClientesService
    {
        private readonly IMongoCollection<Cliente> _clientesCollection;

        public ClientesService(
            IOptions<DatabaseSettings> meiDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                meiDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(
                meiDatabaseSettings.Value.DatabaseName);
            _clientesCollection = mongoDatabase.GetCollection<Cliente>(
                meiDatabaseSettings.Value.ClientesCollectionName);
        }
        public async Task<List<Cliente>> GetAsync() =>
            await _clientesCollection.Find(_ => true).ToListAsync();
        public async Task<Cliente?> GetAsync(string id) =>
        await _clientesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Cliente newCliente) =>
            await _clientesCollection.InsertOneAsync(newCliente);

        public async Task UpdateAsync(string id, Cliente updatedCliente) =>
            await _clientesCollection.ReplaceOneAsync(x => x.Id == id, updatedCliente);

        public async Task RemoveAsync(string id) =>
            await _clientesCollection.DeleteOneAsync(x => x.Id == id);
        
        public async Task<List<Cliente>> GetByUsuarioIdAsync(string usuarioId)
        {
            return await _clientesCollection.Find(f => f.UsuarioId == usuarioId).ToListAsync();
        }

    }
}

