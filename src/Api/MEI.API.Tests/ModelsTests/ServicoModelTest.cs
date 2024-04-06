using mei.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MEI.API.Tests.ModelsTests
{
    public class ServicoModelTests
    {
        [Test]
        public void Servico_ConfiguracaoeObtencaoDoId_Sucesso()
        {
            // Arrange
            var servico = new Servico();
            var IdEsperado = "159";

            // Act
            servico.Id = IdEsperado;
            var IdAtual = servico.Id;

            // Assert
            Assert.AreEqual(IdEsperado, IdAtual);
        }

        [Test]
        public void Servico_ConfiguracaoeObtencaoDoNome_Sucesso()
        {
            // Arrange
            var servico = new Servico();
            var nomeEsperado = "Manutenção ar condicionado";

            // Act
            servico.Nome = nomeEsperado;
            var nomeAtual = servico.Nome;

            // Assert
            Assert.AreEqual(nomeEsperado, nomeAtual);
        }

    }
}
