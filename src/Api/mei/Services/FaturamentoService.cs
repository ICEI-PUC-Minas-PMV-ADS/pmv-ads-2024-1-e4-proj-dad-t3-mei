using mei.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace mei.Services
{
    public class FaturamentosService
    {
        private readonly IMongoCollection<Faturamento> _faturamentosCollection;

        public FaturamentosService(
            IOptions<DatabaseSettings> meiDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                meiDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(
                meiDatabaseSettings.Value.DatabaseName);
            _faturamentosCollection = mongoDatabase.GetCollection<Faturamento>(
                meiDatabaseSettings.Value.FaturamentosCollectionName);

        }
        public async Task<List<Faturamento>> GetAsync() =>
            await _faturamentosCollection.Find(_=> true).ToListAsync();
        public async Task<Faturamento?> GetAsync(string id) =>
            await _faturamentosCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Faturamento newFaturamento) =>
            await _faturamentosCollection.InsertOneAsync(newFaturamento);

        public async Task UpdateAsync(string id, Faturamento updatedFaturamento) =>
            await _faturamentosCollection.ReplaceOneAsync(x => x.Id == id, updatedFaturamento);

        public async Task RemoveAsync(string id) =>
            await _faturamentosCollection.DeleteOneAsync(x => x.Id == id);
        
        public async Task<List<Faturamento>> GetByUsuarioIdAsync(string usuarioId)
        {
            return await _faturamentosCollection.Find(f => f.UsuarioId == usuarioId).ToListAsync();
        }
        
    }
}
