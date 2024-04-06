using mei.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MEI.API.Tests.ModelsTests
{
    public class FaturamentoModelTests
    {
        [Test]
        public void Faturamento_ConfiguracaoeObtencaoDoId_Sucesso()
        {
            // Arrange
            var faturamento = new Faturamento();
            var IdEsperado = "741";

            // Act
            faturamento.Id = IdEsperado;
            var IdAtual = faturamento.Id;

            // Assert
            Assert.AreEqual(IdEsperado, IdAtual);
        }

        [Test]
        public void Faturamento_ConfiguracaoeObtencaoDoMeioDePagamento_Sucesso()
        {
            // Arrange
            var faturamento = new Faturamento();
            var meioDePagamentoEsperado = MeioDePagamento.Dinheiro;

            // Act
            faturamento.MeioDePagamento = meioDePagamentoEsperado;
            var meioDePagamentoAtual = faturamento.MeioDePagamento;

            // Assert
            Assert.AreEqual(meioDePagamentoEsperado, meioDePagamentoAtual);
        }

    }
}
