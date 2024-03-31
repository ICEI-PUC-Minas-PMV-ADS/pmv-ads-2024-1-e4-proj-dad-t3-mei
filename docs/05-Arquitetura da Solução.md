# Arquitetura da Solução
<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![arquitetura distribuida refeita](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/bc67fec4-a497-4b00-b54e-23d2f234b0c2)

![resourceProvider ashx-1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/116749525/2aac44dd-e82e-4a3e-9e6a-1e00ccb7ae61)

## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.


![diagrama_final drawio](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/79220860/1ce15e10-a448-48b6-9063-db9b51b2daae)



## CRUD das Collections Projetadas

- Collection Endereço:

**GET**
![GET](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/eaf2943b-9c4e-4cc2-a9f3-dc7b9d4b5887)

**GET BY ID**
![GetByID](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/5b455264-d2b2-46fd-a687-3088c601f21c)

**POST**
![POST](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/a6283e9f-1ff8-428a-b43f-4b4d3d78f7cd)

**PUT**
![PUT](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/dcba5c8e-2bcb-4fa0-80fc-81861d422b57)

**DELETE**
![DELETE](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/b3aec84b-f1af-4580-a0b7-b5ec9af6bde9)



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

