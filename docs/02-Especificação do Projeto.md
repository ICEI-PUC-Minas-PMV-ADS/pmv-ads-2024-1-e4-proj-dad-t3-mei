# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

Pedro Paulo tem 26 anos, é arquiteto recém-formado e autônomo. Pensa em se desenvolver profissionalmente através de um mestrado fora do país, pois adora viajar, é solteiro e sempre quis fazer um intercâmbio. Está buscando uma agência que o ajude a encontrar universidades na Europa que aceitem alunos estrangeiros.

Enumere e detalhe as personas da sua solução. Para tanto, baseie-se tanto nos documentos disponibilizados na disciplina e/ou nos seguintes links:

> **Links Úteis**:
> - [Rock Content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de Empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de Stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>
Lembre-se que você deve ser enumerar e descrever precisamente e personalizada todos os clientes ideais que sua solução almeja.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | Registrar minhas tarefas           | Não esquecer de fazê-las               |
|Administrador       | Alterar permissões                 | Permitir que possam administrar contas |

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Modelagem do Processo de Negócio 

### Análise da Situação Atual

Apresente aqui os problemas existentes que viabilizam sua proposta. Apresente o modelo do sistema como ele funciona hoje. Caso sua proposta seja inovadora e não existam processos claramente definidos, apresente como as tarefas que o seu sistema pretende implementar são executadas atualmente, mesmo que não se utilize tecnologia computacional. 

### Descrição Geral da Proposta

Apresente aqui uma descrição da sua proposta abordando seus limites e suas ligações com as estratégias e objetivos do negócio. Apresente aqui as oportunidades de melhorias.

### Processo 1 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 1. Em seguida, apresente o modelo do processo 1, descrito no padrão BPMN. 

![Processo 1](img/02-bpmn-proc1.png)

### Processo 2 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 2. Em seguida, apresente o modelo do processo 2, descrito no padrão BPMN.

![Processo 2](img/02-bpmn-proc2.png)

## Indicadores de Desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Colocar no mínimo 5 indicadores. 

Usar o seguinte modelo: 

![Indicadores de Desempenho](img/02-indic-desemp.png)
Obs.: todas as informações para gerar os indicadores devem estar no diagrama de classe a ser apresentado a posteriori. 

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| O sistema deve exibir o total de vendas ou serviços do dia, semana, mês ou ano | ALTA |
|RF-002| Emitir um alerta do limite mensal e anual da respectiva subcategoria do MEI | ALTA |
|RF-003| Separar vendas a prazo, à vista, cartão, pix ou dinheiro | ALTA |
|RF-004| Autenticar o usuário | MÉDIA |
|RF-005| Permitir fazer uma agenda de clientes | BAIXA |
|RF-006| Permitir cadastrar serviços prestados e produtos vendidos | MÉDIA |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo e otimizado para rodar em dispositivos móvel e navegadores| MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s | MÉDIA | 
|RNF-003| Estar disponível aproximadamente 24/7, com reduzidas interrupções para manutenção | ALTA | 
|RNF-004| Proteger dados sensíveis de usuários por meio de criptografia e autenticação segura.| ALTA | 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Diagrama de Casos de Uso

ATOR |	DESCRIÇÃO |
--|--|
Empresário|	Usuário responsável pelo cadastro de suas vendas, serviços prestados e clientes.|


CASOS DE USO     | DESCRIÇÃO  |RF |
---|---|---|
Validar usuário|O sistema deve autenticar o ator corretamente para que ele consiga realizar suas necessidades dentro do sistema.|RF-004|
Visualizar valor total de vendas/ serviços diários|	O sistema deve permitir que o usuário visualize o total de suas vendas/serviços diários.|	RF-001|
Visualizar valor total de vendas/ serviços mensais|	O sistema deve permitir que o usuário visualize o total de suas vendas/serviços mensais.|	RF-001|
Visualizar valor total de vendas/ serviços anuais| 	O sistema deve permitir que o usuário visualize o total de suas vendas/serviços mensais.|	RF-001|
Visualizar alerta mensal de valor da subcategoria|	O sistema deve permitir que o usuário visualize um alerta mensalmente sobre o valor da subcategoria do MEI.| 	RF-002|
Visualizar alerta anual de valor da subcategoria|	O sistema deve permitir que o usuário visualize um alerta mensalmente sobre o valor da subcategoria do MEI.| 	RF-002|
Visualizar vendas a prazo|	O sistema deve permitir que o usuário visualize o valor total das vendas a prazo.|	RF-003|
Visualizar vendas à vista|	O sistema deve permitir que o usuário visualize o valor total das vendas à vista.|	RF-003|
Visualizar vendas no cartão|	O sistema deve permitir que o usuário visualize o valor total das vendas no cartão.|	RF-003|
Visualizar vendas no PIX|	O sistema deve permitir que o usuário visualize o valor total das vendas no PIX.|	RF-003|
Visualizar vendas no dinheiro|	O sistema deve permitir que o usuário visualize o valor total das vendas no dinheiro.|	RF-003|
Cadastrar serviços prestados|	O sistema deve permitir que o usuário cadastre os serviços prestados.|	RF-006|
Cadastrar produtos vendidos|	O sistema deve permitir que o usuário cadastre os produtos vendidos.|	RF-006|
Criar agenda de clientes|	O sistema deve permitir que o usuário crie uma agenda de clientes.|	RF-005|

# Matriz de Rastreabilidade

A matriz de rastreabilidade é uma ferramenta usada para facilitar a visualização dos relacionamento entre requisitos e outros artefatos ou objetos, permitindo a rastreabilidade entre os requisitos e os objetivos de negócio. 

A matriz deve contemplar todos os elementos relevantes que fazem parte do sistema, conforme a figura meramente ilustrativa apresentada a seguir.

![Exemplo de matriz de rastreabilidade](img/02-matriz-rastreabilidade.png)

> **Links Úteis**:
> - [Artigo Engenharia de Software 13 - Rastreabilidade](https://www.devmedia.com.br/artigo-engenharia-de-software-13-rastreabilidade/12822/)
> - [Verificação da rastreabilidade de requisitos usando a integração do IBM Rational RequisitePro e do IBM ClearQuest Test Manager](https://developer.ibm.com/br/tutorials/requirementstraceabilityverificationusingrrpandcctm/)
> - [IBM Engineering Lifecycle Optimization – Publishing](https://www.ibm.com/br-pt/products/engineering-lifecycle-optimization/publishing/)


# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

## Gerenciamento de Tempo

Com diagramas bem organizados que permitem gerenciar o tempo nos projetos, o gerente de projetos agenda e coordena tarefas dentro de um projeto para estimar o tempo necessário de conclusão.

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

Com base no cronograma estipulado pela Intituição PUC Minas, a divisão das tarefas em relação as datas ficaram da seguinte forma (Demonstrado a partir do Diagrama de Gannt):

**Etapa 1 do Projeto**

![Diagrama de Gantt - Etapa 1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/46386b9a-338b-4480-b9f3-ce32d74e7347)

**Etapa 2 do Projeto**

![Diagrama de Gantt - Etapa 2](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/c633d2ae-117e-4f7f-993d-f390b221f87f)

**Etapa 3 do Projeto**

![Diagrama de Gantt - Etapa 3](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/4387ee4c-21f4-48a6-b7a6-3bbb1763bbe6)

**Etapa 4 do Projeto**

![Diagrama de Gantt - Etapa 4](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/5976de25-1666-4fae-9b09-2755a121adf4)

**Etapa 5 do Projeto**

![Diagrama de Gantt - Etapa 5](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/34f6487d-18ec-4ba6-8639-f59ef471e2a0)

A partir do desenvolvimento de cada etapa, as atividades seguintes ficarão mais detalhadas, seguindo os Requisitos estabelecidos pela equipe e sua ordem de prioridade para execução.

## Gerenciamento de Equipe

O gerenciamento adequado de tarefas contribuirá para que o projeto alcance altos níveis de produtividade. Por isso, é fundamental que ocorra a gestão de tarefas e de pessoas, de modo que os times envolvidos no projeto possam ser facilmente gerenciados. 

![gerenciamento equipe](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/f5deb358-f089-49c8-a2ca-9fa2414f3522)

## Gestão de Orçamento

O processo de determinar o orçamento do projeto é uma tarefa que depende, além dos produtos (saídas) dos processos anteriores do gerenciamento de custos, também de produtos oferecidos por outros processos de gerenciamento, como o escopo e o tempo.

![Orçamento Projeto](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/1e4b6e16-c39c-46d0-954a-a636bc604449)


