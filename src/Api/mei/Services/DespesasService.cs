using mei.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace mei.Services
{
    public class DespesasService
    {
        private readonly IMongoCollection<Despesa> _despesasCollection;

        public DespesasService(
            IOptions<DatabaseSettings> meiDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                meiDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(
                meiDatabaseSettings.Value.DatabaseName);
            _despesasCollection = mongoDatabase.GetCollection<Despesa>(
                meiDatabaseSettings.Value.DespesasCollectionName);
        }
        public async Task<List<Despesa>> GetAsync() =>
            await _despesasCollection.Find(_ => true).ToListAsync();
        public async Task<Despesa?> GetAsync(string id) =>
        await _despesasCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Despesa newDespesa) =>
            await _despesasCollection.InsertOneAsync(newDespesa);

        public async Task UpdateAsync(string id, Despesa updatedDespesa) =>
            await _despesasCollection.ReplaceOneAsync(x => x.Id == id, updatedDespesa);

        public async Task RemoveAsync(string id) =>
            await _despesasCollection.DeleteOneAsync(x => x.Id == id);
        
        public async Task<List<Despesa>> GetByUsuarioIdAsync(string usuarioId)
        {
            return await _despesasCollection.Find(f => f.UsuarioId == usuarioId).ToListAsync();
        }
    }
}

