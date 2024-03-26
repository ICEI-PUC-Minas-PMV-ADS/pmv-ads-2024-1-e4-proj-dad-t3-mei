# Especificações do Projeto

Com essa ferramenta temos a intenção de facilitar o dia a dia dos empresários, para que eles consigam ter um maior controle de suas finanças. Temos como prioridade ajudar o microempreendedor a controlar suas vendas por dia, semana ou mês, emitindo também um alerta de limite total do mês, para que ele não extrapole e tenha surpresas ao final.
## Personas

![persona 1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/115122757/7986cca4-90c2-4c9d-accf-97b3e983003d)
Dilma tem 50 anos, é uma microempreendedora na cidade de Belo Horizonte MG. Ela tem uma loja de roupas, e mesmo que nem todas as semanas sejam muito movimentadas, ela sente dificuldade de controlar suas finanças, saber quanto foi vendido no débito, crédito e dinheiro. Está em busca de um sistema que a ajude a melhorar seu controle financeiro, e assim, saiba exatamente quanto vendeu por semana.

![persona 2](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/115122757/3f79d479-cd71-4d48-b6e9-b1869d8976ed)
Júlia tem 28 anos, tem uma mercadinho na cidade de Contagem MG, pelo alto movimento todos os dias, ela sente muita dificuldade de monitorar quanto está vendendo para que não tenha surpresas na hora da declaração do imposto.

![persona 3](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/115122757/fc7fb534-f2b8-40d1-b3fd-15d0c1ad00b7)
Daniel tem 35 anos, é dono de uma padaria na cidade de Petrópoles RJ, como o movimento em seu comércio é muito alto ele gostaria de ter uma ferramenta que o ajudasse a ver suas vendas diárias sem peder muito tempo com os cálculos. 

![persona 4](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/115122757/ccf0f51a-20e5-4017-ae9e-4ca7201d3c32)
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

No processo em questão, o gerenciamento das despesas, faturamentos e metas evidencia os benefícios positivos que uma aplicação voltada para o auxílio de microempreendedores poderia proporcionar ao facilitar essas tarefas.

### Descrição Geral da Proposta

Apresente aqui uma descrição da sua proposta abordando seus limites e suas ligações com as estratégias e objetivos do negócio. Apresente aqui as oportunidades de melhorias.

### Processo 1 – Controle de Finanças MEI

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/116749525/5ec2ff3e-856c-40e9-8556-c37cdba64b5b)

## Indicadores de Desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Colocar no mínimo 5 indicadores. 

![indicadores](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/116749525/9c038b2b-6dcd-4166-8dfd-5415ff64ad69)

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

![matriz de rastreabilidade](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/115122757/16b16076-0064-4df6-810f-9bc144c981c8)



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

![Orçamento Projeto refeito](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t3-mei/assets/113808083/d4d8cf6f-d773-4d5a-86fd-9a98e1d3d921)

Explicação do orçamento:

- Foram considerados 143 dias corridos de projeto e 4 horas de desenvolvimento por dia, totalizando 572 horas de projeto;
- Foram considerados salários de estágio para cada integrante do projeto (R$2500,00 para Fullstack, R$1800 para UX, R$1900 para Tester e R$2100 para o Scrum);
- Horas de trabalho semanal: 28 horas (4 horas x 7 dias);
- Valor Hora: Salario / ( hora semanal x 4 );
- Para os valores dos Hardware, foram considerados equipamentos simples (Computador: R$3000,00, Tela extra: R$450,00, Mouse: R$50,00 e Teclado: R$150,00) R$ R$ e os valores foram divididos pelo total de eixos da faculdade (5 eixos);
- Porcentagem de lucro: sugerido pelo orientador do Projeto.
