using mei.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace mei.Services
{
    public class ProdutosService
    {
        private readonly IMongoCollection<Produto> _produtosCollection;

        public ProdutosService(
            IOptions<DatabaseSettings> meiDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                meiDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(
                meiDatabaseSettings.Value.DatabaseName);
            _produtosCollection = mongoDatabase.GetCollection<Produto>(
                meiDatabaseSettings.Value.ProdutosCollectionName);
        }
        public async Task<List<Produto>> GetAsync() =>
            await _produtosCollection.Find(_ => true).ToListAsync();
        public async Task<Produto?> GetAsync(string id) =>
        await _produtosCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Produto newProduto) =>
            await _produtosCollection.InsertOneAsync(newProduto);

        public async Task UpdateAsync(string id, Produto updatedProduto) =>
            await _produtosCollection.ReplaceOneAsync(x => x.Id == id, updatedProduto);

        public async Task RemoveAsync(string id) =>
            await _produtosCollection.DeleteOneAsync(x => x.Id == id);
    }
}
