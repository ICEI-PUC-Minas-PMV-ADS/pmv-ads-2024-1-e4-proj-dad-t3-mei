using mei.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MEI.API.Tests.ModelsTests
{
    public class MeiModelTests
    {
        [Test]
        public void Mei_ConfiguracaoeObtencaoDoId_Sucesso()
        {
            // Arrange
            var mei = new Mei();
            var IdEsperado = "852";

            // Act
            mei.Id = IdEsperado;
            var IdAtual = mei.Id;

            // Assert
            Assert.AreEqual(IdEsperado, IdAtual);
        }

        [Test]
        public void Mei_ConfiguracaoeObtencaoDoTipoMei_Sucesso()
        {
            // Arrange
            var mei = new Mei();
            var TipoMeiEsperado = TipoMei.MeiComum;

            // Act
            mei.TipoMei = TipoMeiEsperado;
            var TipoMeiAtual = mei.TipoMei;

            // Assert
            Assert.AreEqual(TipoMeiEsperado, TipoMeiAtual);
        }

    }
}
