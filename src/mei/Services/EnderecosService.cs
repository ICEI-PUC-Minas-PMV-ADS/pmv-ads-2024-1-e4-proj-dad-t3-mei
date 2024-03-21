using mei.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace mei.Services
{
    public class EnderecosService
    {
        private readonly IMongoCollection<Endereco> _enderecosCollection;

        public EnderecosService(
            IOptions<DatabaseSettings> meiDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                meiDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(
                meiDatabaseSettings.Value.DatabaseName);
            _enderecosCollection = mongoDatabase.GetCollection<Endereco>(
                meiDatabaseSettings.Value.EnderecosCollectionName);

        }
        public async Task<List<Endereco>> GetAsync() =>
            await _enderecosCollection.Find(_ => true).ToListAsync();
        public async Task<Endereco?> GetAsync(string id) =>
            await _enderecosCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Endereco newEndereco) =>
            await _enderecosCollection.InsertOneAsync(newEndereco);

        public async Task UpdateAsync(string id, Endereco updatedEndereco) =>
            await _enderecosCollection.ReplaceOneAsync(x => x.Id == id, updatedEndereco);

        public async Task RemoveAsync(string id) =>
            await _enderecosCollection.DeleteOneAsync(x => x.Id == id);
    }
}
