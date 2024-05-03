using mei.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace mei.Services
{
    public class CategoriasService
    {
        private readonly IMongoCollection<Categoria> _categoriasCollection;

        public CategoriasService(
            IOptions<DatabaseSettings> meiDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                meiDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(
                meiDatabaseSettings.Value.DatabaseName);
            _categoriasCollection = mongoDatabase.GetCollection<Categoria>(
                meiDatabaseSettings.Value.CategoriasCollectionName);
        }
        public async Task<List<Categoria>> GetAsync() =>
            await _categoriasCollection.Find(_ => true).ToListAsync();
        public async Task<Categoria?> GetAsync(string id) =>
        await _categoriasCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Categoria newCategoria) =>
            await _categoriasCollection.InsertOneAsync(newCategoria);

        public async Task UpdateAsync(string id, Categoria updatedCategoria) =>
            await _categoriasCollection.ReplaceOneAsync(x => x.Id == id, updatedCategoria);

        public async Task RemoveAsync(string id) =>
            await _categoriasCollection.DeleteOneAsync(x => x.Id == id);
        
        public async Task<List<Categoria>> GetByUsuarioIdAsync(string usuarioId)
        {
            return await _categoriasCollection.Find(f => f.UsuarioId == usuarioId).ToListAsync();
        }
    }
}
