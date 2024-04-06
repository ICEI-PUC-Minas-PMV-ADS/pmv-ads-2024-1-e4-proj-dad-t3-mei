using mei.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MEI.API.Tests.ModelsTests
{
    public class UsuarioModelTests
    {
        [Test]
        public void Usuario_ConfiguracaoeObtencaoDoId_Sucesso()
        {
            // Arrange
            var usuario = new Usuario();
            var IdEsperado = "159";

            // Act
            usuario.Id = IdEsperado;
            var IdAtual = usuario.Id;

            // Assert
            Assert.AreEqual(IdEsperado, IdAtual);
        }

        [Test]
        public void Usuario_ConfiguracaoeObtencaoDoNome_Sucesso()
        {
            // Arrange
            var usuario = new Usuario();
            var nomeEsperado = "Junia Campos";

            // Act
            usuario.Nome = nomeEsperado;
            var nomeAtual = usuario.Nome;

            // Assert
            Assert.AreEqual(nomeEsperado, nomeAtual);
        }

    }
}
