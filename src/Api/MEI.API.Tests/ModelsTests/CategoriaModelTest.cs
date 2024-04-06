using mei.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MEI.API.Tests.ModelsTests
{
    public class CategoriaModelTests
    {
        [Test]
        public void Categoria_ConfiguracaoeObtencaoDoId_Sucesso()
        {
            // Arrange
            var categoria = new Categoria();
            var IdEsperado = "456";

            // Act
            categoria.Id = IdEsperado;
            var IdAtual = categoria.Id;

            // Assert
            Assert.AreEqual(IdEsperado, IdAtual);
        }

        [Test]
        public void Categoria_ConfiguracaoeObtencaoDoNome_Sucesso()
        {
            // Arrange
            var categoria = new Categoria();
            var nomeEsperado = "Despesas Fixas";

            // Act
            categoria.Nome = nomeEsperado;
            var nomeAtual = categoria.Nome;

            // Assert
            Assert.AreEqual(nomeEsperado, nomeAtual);
        }

    }
}
