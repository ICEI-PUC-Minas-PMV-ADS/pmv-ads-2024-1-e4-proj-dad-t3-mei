using mei.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace mei.Services
{
    public class MeisService
    {
        private readonly IMongoCollection<Mei> _meisCollection;

        public MeisService(
            IOptions<DatabaseSettings> meiDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                meiDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(
                meiDatabaseSettings.Value.DatabaseName);
            _meisCollection = mongoDatabase.GetCollection<Mei>(
                meiDatabaseSettings.Value.MeisCollectionName);
        }
        public async Task<List<Mei>> GetAsync() =>
            await _meisCollection.Find(_=>true).ToListAsync();
        public async Task<Mei?> GetAsync(string id) =>
        await _meisCollection
            .Find(x => x.Id == id)
            .FirstOrDefaultAsync();

        public async Task CreateAsync(Mei newMei) =>
            await _meisCollection.InsertOneAsync(newMei);

        public async Task UpdateAsync(string id, Mei updatedMei) =>
            await _meisCollection.ReplaceOneAsync(x => x.Id == id, updatedMei);

        public async Task RemoveAsync(string id) =>
            await _meisCollection.DeleteOneAsync(x => x.Id == id);
        
        public async Task<List<Mei>> GetByUsuarioIdAsync(string usuarioId)
        {
            return await _meisCollection.Find(f => f.UsuarioId == usuarioId).ToListAsync();
        }
    }
}
