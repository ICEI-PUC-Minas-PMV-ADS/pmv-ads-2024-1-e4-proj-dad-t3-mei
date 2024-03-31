using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace mei.Models
{
    public class Usuario
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Nome { get; set; }
        public string CNPJ { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
    }
}
