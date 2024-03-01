# Especificações do Projeto

Com essa ferramenta temos a intenção de facilitar o dia a dia dos empresários, para que eles consigam ter um maior controle de suas finanças. Temos como prioridade ajudar o microempreendedor a controlar suas vendas por dia, semana ou mês, emitindo também um alerta de limite total do mês, para que ele não extrapole e tenha surpresas ao final.
## Personas

Dilma tem 50 anos, é uma microempreendedora na cidade de Belo Horizonte MG. Ela tem uma loja de roupas, e mesmo que nem todas as semanas sejam muito movimentadas, ela sente dificuldade de controlar suas finanças, saber quanto foi vendido no débito, crédito e dinheiro. Está em busca de um sistema que a ajude a melhorar seu controle financeiro, e assim, saiba exatamente quanto vendeu por semana.

Júlia tem 28 anos, tem uma mercadinho na cidade de Contagem MG, pelo alto movimento todos os dias, ela sente muita dificuldade de monitorar quanto está vendendo para que não tenha surpresas na hora da declaração do imposto.

Daniel tem 35 anos, é dono de uma padaria na cidade de Petrópoles RJ, como o movimento em seu comércio é muito alto ele gostaria de ter uma ferramenta que o ajudasse a ver suas vendas diárias sem peder muito tempo com os cálculos. 

Renato tem 46 anos, ele era MEI em 2020, nessa época por falta de controle do faturamento acabou estrapolando o limite permitido e foi excluido do regime, tendo que pagar os impostos retroativos. Como esse ano, 2024, resolveu voltar a ser MEI, está com receio da mesma coisa acontecer, e por isso busca no mercado um sistema que o ajude neste controle e o avise quando ele estiver prestes a atingir o limite novamente.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Dilma, empreendedor | Controlar as vendas, para saber exatamente quanto vendeu.|Ter um maior controle das vendas|
|Júlia, empreendedora  | Verificar quanto está o faturamento, para que esteja enquadrada no  sistema certo.| Para que não tenha surpresas. | 
|Daniel, empreendedor |Como tem um movimento muito alto por dia, gostaria de controlar exatamente quanto vendeu no dia|Ter um maior controle das vendas|
|Renato, empreendedor| Como já teve MEI a um tempo atras e acabou estrapolando o limite sendo excluido do regime e tendo que pagar muitos impostos, gostaria de ter uma ferramenta para controlar|Ter um controle maior de seus ganhos.|


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
|RF-001| O sistema deve exibir o total monetário de vendas ou serviços do dia, semana, mês ou ano. | ALTA |
|RF-002| Emitir alertas textuais do limite mensal/anual de faturamento da respectiva subcategoria do MEI. | ALTA |
|RF-003| Mostrar um alerta visual do faturamento,de acordo com sua subcategoria (caminhoneiro ou demais atividades), do MEI em tempo real. Usar verde como limite adequado, laranja para alerta e vermelho como extrapolado. | ALTA |
|RF-004| Separar vendas a prazo, à vista, cartão, pix ou dinheiro. | ALTA |
|RF-005| O usuário deverá fazer login e ser autenticado. | ALTA |
|RF-006| Permitir fazer uma agenda de clientes. | BAIXA |
|RF-007| Permitir cadastrar serviços prestados e produtos vendidos. | MÉDIA|
|RF-008| Ter a opção "Encontrar um contador próximo a você" e mostrar um mapa com os contadores próximos, para caso o MEI precise de um. | BAIXA|
|RF-009| Cadastrar e categorizar o tipo de despesa (materia prima, material revenda, uso consumo, material de limpeza, energia eletrica, água, etc). | MÉDIA |
|RF-010| Permitir que o empresário veja a razão entre faturamento e despesas. | MÉDIA|
|RF-011| Criar um alerta textual para caso as despesas ultrapassem o faturamento. | MÉDIA|


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
|01| O projeto deverá ser entregue até o final do semestre e deve ser desenvolvido apenas pelos alunos |
|02| O sistema/app permite apenas empresário que estejam na categoria de tributação MEI, onde os limites de faturamento sejam os vigentes em lei (em 2024 é R$81.000,00 para atividades diversas e R$251.600,00 para caminhoneiros) |
|03| A API da solução deve ser programada em C# |

## Diagrama de Casos de Uso

ATOR |	DESCRIÇÃO |
--|--|
Empresário|	Usuário responsável pelo cadastro de suas vendas, serviços prestados e clientes.|

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/114624183/eb4efca3-b581-495f-bfd3-71b0320081a1)

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


