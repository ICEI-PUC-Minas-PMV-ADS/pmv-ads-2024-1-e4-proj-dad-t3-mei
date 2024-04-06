using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace mei.Models
{
    public class Faturamento
    { 
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public List<string>? ProdutosId { get; set; }
        public List<string>? ServicosId { get; set; }
        public string Nome { get; set; }
        public decimal Valor { get; set; }
        public DateTime DataFaturamento { get; set; }
        public MeioDePagamento MeioDePagamento { get; set; }
    }

    public enum MeioDePagamento
    {
        [BsonElement("Dinheiro")]
        Dinheiro,
        [BsonElement("Cartao")]
        Cartao,
        [BsonElement("Pix")]
        Pix,
        [BsonElement("Outro")]
        Outro

    }
}
