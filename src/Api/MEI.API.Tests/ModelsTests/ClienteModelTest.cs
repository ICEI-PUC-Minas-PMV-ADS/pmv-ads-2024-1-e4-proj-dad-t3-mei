using mei.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MEI.API.Tests.ModelsTests
{
    public class ClienteModelTests
    {
        [Test]
        public void Cliente_ConfiguracaoeObtencaoDoId_Sucesso()
        {
            // Arrange
            var cliente = new Cliente();
            var IdEsperado = "789";

            // Act
            cliente.Id = IdEsperado;
            var IdAtual = cliente.Id;

            // Assert
            Assert.AreEqual(IdEsperado, IdAtual);
        }

        [Test]
        public void Cliente_ConfiguracaoeObtencaoDoNome_Sucesso()
        {
            // Arrange
            var cliente = new Cliente();
            var nomeEsperado = "Joana";

            // Act
            cliente.Nome = nomeEsperado;
            var nomeAtual = cliente.Nome;

            // Assert
            Assert.AreEqual(nomeEsperado, nomeAtual);
        }

    }
}
