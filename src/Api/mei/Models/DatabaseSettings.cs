namespace mei.Models
{
    public class DatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string MeisCollectionName { get; set; } = null!;
        public string UsuariosCollectionName { get; set; } = null!;
        public string FaturamentosCollectionName { get; set; } = null!;
        public string CategoriasCollectionName { get; set; } = null!;
        public string ClientesCollectionName { get; set; } = null!;
        public string DespesasCollectionName { get; set; } = null!;
        public string ProdutosCollectionName { get; set; } = null!;

    }
}
