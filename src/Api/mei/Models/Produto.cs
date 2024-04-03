using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace mei.Models
{
    public class Produto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Nome { get; set; }
    }
}
