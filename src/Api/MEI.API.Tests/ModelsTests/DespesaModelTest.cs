using mei.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MEI.API.Tests.ModelsTests
{
    public class DespesaModelTests
    {
        [Test]
        public void Despesa_ConfiguracaoeObtencaoDoId_Sucesso()
        {
            // Arrange
            var despesa = new Despesa();
            var IdEsperado = "123";

            // Act
            despesa.Id = IdEsperado;
            var IdAtual = despesa.Id;

            // Assert
            Assert.AreEqual(IdEsperado, IdAtual);
        }

        [Test]
        public void Despesa_ConfiguracaoeObtencaoDoNome_Sucesso()
        {
            // Arrange
            var despesa = new Despesa();
            var nomeEsperado = "Aluguel";

            // Act
            despesa.Nome = nomeEsperado;
            var nomeAtual = despesa.Nome;

            // Assert
            Assert.AreEqual(nomeEsperado, nomeAtual);
        }

    }
}
