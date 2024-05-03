using mei.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace mei.Services
{
    public class ServicosService
    {
        private readonly IMongoCollection<Servico> _servicosCollection;

        public ServicosService(
            IOptions<DatabaseSettings> meiDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                meiDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(
                meiDatabaseSettings.Value.DatabaseName);
            _servicosCollection = mongoDatabase.GetCollection<Servico>(
                meiDatabaseSettings.Value.ServicosCollectionName);
        }
        public async Task<List<Servico>> GetAsync() =>
            await _servicosCollection.Find(_ => true).ToListAsync();
        public async Task<Servico?> GetAsync(string id) =>
        await _servicosCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Servico newServico) =>
            await _servicosCollection.InsertOneAsync(newServico);

        public async Task UpdateAsync(string id, Servico updatedServico) =>
            await _servicosCollection.ReplaceOneAsync(x => x.Id == id, updatedServico);

        public async Task RemoveAsync(string id) =>
            await _servicosCollection.DeleteOneAsync(x => x.Id == id);
        
        public async Task<List<Servico>> GetByUsuarioIdAsync(string usuarioId)
        {
            return await _servicosCollection.Find(f => f.UsuarioId == usuarioId).ToListAsync();
        }
    }
}
