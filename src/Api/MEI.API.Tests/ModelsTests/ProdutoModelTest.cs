using mei.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MEI.API.Tests.ModelsTests
{
    public class ProdutoModelTests
    {
        [Test]
        public void Produto_ConfiguracaoeObtencaoDoId_Sucesso()
        {
            // Arrange
            var produto = new Produto();
            var IdEsperado = "963";

            // Act
            produto.Id = IdEsperado;
            var IdAtual = produto.Id;

            // Assert
            Assert.AreEqual(IdEsperado, IdAtual);
        }

        [Test]
        public void Produto_ConfiguracaoeObtencaoDoNome_Sucesso()
        {
            // Arrange
            var produto = new Produto();
            var nomeEsperado = "Biscoito de Queijo";

            // Act
            produto.Nome = nomeEsperado;
            var nomeAtual = produto.Nome;

            // Assert
            Assert.AreEqual(nomeEsperado, nomeAtual);
        }

    }
}
