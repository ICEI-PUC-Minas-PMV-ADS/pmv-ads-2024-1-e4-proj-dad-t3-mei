using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;
using System.Collections;

namespace mei.Models
{
    public class Despesa
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Nome { get; set; }
        public decimal Valor { get; set; }
        public DateTime DataReceita { get; set; }
        public List<string>? Categoria { get; set; }
    }
}
