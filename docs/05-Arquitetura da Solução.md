# Arquitetura da Solução
<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![arquitetura distribuida refeita](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/bc67fec4-a497-4b00-b54e-23d2f234b0c2)

![resourceProvider ashx-1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/116749525/2aac44dd-e82e-4a3e-9e6a-1e00ccb7ae61)

## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.


![diagrama_final drawio](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/79220860/1ce15e10-a448-48b6-9063-db9b51b2daae)



## Schemas das Collections Projetadas

- Collection MEI:

![Schema MEI](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/c7c8b535-a99b-466d-9bd8-c6e395ebbcbe)

![Example Value MEI](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/a1fa0bf0-588b-46a6-80af-14cee7dfc504)

- Collection Usuario:

![Schema Usuario](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/632fc39d-6311-47d3-a383-16687a316d04)

![Example Value Usuario](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/1165df44-d360-4e0f-9737-4c7a3d0462d3)

- Collection Cliente:

![Schema Cliente](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/f8c3ab65-3dca-466b-8561-03ac67e9297b)

![Example Value Cliente](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/b3611568-1f4e-451a-bf1f-32fcc6f432be)

- Collection Faturamento:

![Schema Faturamento](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/62be8db1-9590-4596-b1bf-68f53bafac9f)

![Example Value Faturamento](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/55124558-e719-4879-a2f4-6e6cf0cad578)

- Collection Despesa:

![Schema Despesa](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/38a2492d-6318-44b7-9864-bc2c32c5f9cd)

![Example Value Despesa](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/c529576a-d7c4-49ed-aee8-47c79735d791)

- Collection Categoria:

![Schema Categoria](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/39993dca-6fae-419c-bef6-55ff5651fec4)

![Example Value Categoria](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/94a6c390-ece2-42e8-bbda-6f902aa0e1ac)

- Collection Serviço:

![Schema Serviço](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/b5784055-f6c7-4635-a8a5-43346499eb4b)

![Example Value Servico](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/cb48323b-a841-48bd-9935-208ebab4fb30)

- Collection Produto:

![Schema Produto](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/fbcc1bc6-a89e-4a20-ac3d-a48dd80d7fb7)

![Example Value Produto](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/b01c3d6a-b248-4431-a396-fa8e365652b2)

## Tecnologias Utilizadas

 - Ambiente de Desenvolvimento: Visual Studio 2022 e Visual Studio Code
 - Front-end: React
 - Front-end Mobile: React Native
 - Banco de dados: MongoDB
 - Back-end: C#
 - Diagramas: Figma, Lucidchart, Draw.io
 - Plataforma: Azure

## Hospedagem

A princípio, utilizaremos o Microsoft Azure para hospedagem.

## Qualidade de Software

Conceituar qualidade de fato é uma tarefa complexa, mas ela pode ser vista como um método gerencial que através de procedimentos disseminados por toda a organização, busca garantir um produto final que satisfaça às expectativas dos stakeholders.

No contexto de desenvolvimento de software, qualidade pode ser entendida como um conjunto de características a serem satisfeitas, de modo que o produto de software atenda às necessidades de seus usuários. Entretanto, tal nível de satisfação nem sempre é alcançado de forma espontânea, devendo ser continuamente construído. Assim, a qualidade do produto depende fortemente do seu respectivo processo de desenvolvimento.

A norma internacional ISO/IEC 25010, que é uma atualização da ISO/IEC 9126, define oito características e 30 subcaracterísticas de qualidade para produtos de software.
Com base nessas características e nas respectivas sub-características, identifique as sub-características que sua equipe utilizará como base para nortear o desenvolvimento do projeto de software considerando-se alguns aspectos simples de qualidade. 

| Caracteristica | Subcaracteristica | Justificativa | Métrica |
| -------------- | ----------------- | ------------- | ------- |
| Funcionalidade | Adequação | Para avaliar se o sistema atende bem os requisitos levantados pela equipe. | O software atende os requisitos levantados? 1- Atende 2- Atende a maioria 3- Não atende. Sendo nota 0 para o "Não atende", 3 para o "Atende a maioria" e 5 para o "Atende".|
| Confiabilidade | Recuperabilidade | A equipe considera essa subcaracteristica importante, pois muitos dados podem ser perdidos após uma falha do sistema, trazendo muitos problemas aos projetos que foram iniciados. | Os dados anteriores foram recuperados? 1- Sim 2- Não. Use "Sim" se TODOS os dados foram recuperados e "Não" se pelo menos um dado está faltando. Será avaliado, em porcentagem, se o sistema obteve exito na recuperação dos dados.|
| Usabilidade | Apreensibilidade | A equipe optou por essa subcaracteristica para poder entender melhor o quão dificil está para o usuário aprender a usar todas as funcionalidades oferecidas pelo sistema. | O sistema é de fácil entendimento? 1- Totalmente 2- Grande Parte 3- Não. Sendo nota 5 para "Totalmente", 3 para "Grande Parte" e 0 para "Não"|
| Eficiência | Comportamento em relação ao tempo | É extremamente importante a avaliação do tempo quando for requisitado um dado na tela. | O sistema demora quando tempo para responder sua requisição? 1- De 0 a 3 segundos 2- De 4 a 7 segundos 3- De 7 a 10 segundos 4- mais de 10 segundos. Sendo nota 5 para "de 0 a 3 segundos", nota 3 para " de 4 a 7 segundos", nota 2 para " de 7 a 10 segundos" e nota 0 para " mais de 10 segundos".|
| Manutenibilidade | Analisabilidade | a equipe considerou uma subcaracteristica importante, pois é uma forma de verificar o quanto o código está sendo escrito com fácil compreensão e o quão fácil será para corrigir um erro | Quanto tempo levou para analisar e corrigir um erro? 1- 15 min a 1 hora 2- 1 hora a 2 horas 3- mais de 3 horas. Sendo notas 5 para a opção 1, nota 3 para a opção 2 e nota 0 para a opção 3. |
| Segurança | Confidencialidade | Para proteger os dados do projeto de cada equipe, foi escolhido essa subcaracteristica para avaliação. | O dados estão criptografados? 1- Sim 2- Não. A senha continua criptografada após o usuário realizar o login? 1- Sim 2- Não.||
|Portabilidade | Adaptabilidade | Para analisar a capacidade do aplicativo se adaptar ao android e ios. | Qual o tempo médio para implementar mudanças ou atualizações exigidas na plataforma usada? 1- 15 min a 1 hora 2- 1 hora a 2 horas 3- mais de 3 horas. Sendo notas 5 para a opção 1, nota 3 para a opção 2 e nota 0 para a opção 3. |

