using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace mei.Models
{
    public class Despesa
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Nome { get; set; }
        public decimal Valor { get; set; }
        public DateTime DataDespesa { get; set; }
        public List<string>? CategoriasId { get; set; }
        public string UsuarioId { get; set; }

    }
}
