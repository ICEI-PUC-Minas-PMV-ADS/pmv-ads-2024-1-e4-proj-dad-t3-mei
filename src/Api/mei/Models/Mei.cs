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
        public string Id { get; set; }
        public string UsuarioId { get; set; }
        public List<string>? FaturamentosId { get; set; }
        public List<string>? DespesasId { get; set; }
        public List<string>? ClientesId { get; set; }

        public TipoMei TipoMei { get; set; }
        public string NomeEmpresa { get; set; } = null!;
        public DateTime DataCadastro { get; set; }
        public Endereco Endereco { get; set; }
        public List<string>? Geo { get; set; }
    }
    public enum TipoMei
    {
        [BsonElement("MEI Comum")]
        MeiComum,
        [BsonElement("MEI Caminhoneiro")]
        MeiCaminhoneiro
    }

    public class Endereco
    {
        public string UF { get; set; }
        public string Cidade { get; set; }
        public string Cep { get; set; }
        public string Logradouro { get; set; }
        public string Numero { get; set; }
        public string Bairro { get; set; }
    }
}

