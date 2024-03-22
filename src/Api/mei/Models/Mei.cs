using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace mei.Models
{
    public class Mei
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string Cnpj { get; set; } = null!;
        public TipoMei TipoMei { get; set; }
        public string NomeEmpresa { get; set; } = null!;
        //
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public DateTime DataCadastro { get; set; }
        public Endereco? Endereco { get; set; }
        //
        public List<string>? IdFaturamento { get; set; }
        public List<string>? IdDespesa { get; set; }
        public List<string>? IdCliente { get; set; }
    }
    public enum TipoMei
    {
        [BsonElement("MEI Comum")]
        MeiComum,
        [BsonElement("MEI Caminhoneiro")]
        Meicaminhoneiro
    }
}
