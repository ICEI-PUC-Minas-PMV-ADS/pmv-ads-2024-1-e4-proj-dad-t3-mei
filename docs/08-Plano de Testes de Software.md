# Plano de Testes de Software

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>

Apresente os cenários de testes utilizados na realização dos testes da sua aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

| **Caso de Teste** | CT 01 - Logar no Sistema |
|------------------ | ------------------------ |
| **Requisitos Associados** | RF005 - O usuário deverá fazer login autenticado. |
| **Objetivo do Teste** | Permitir que o usuário acesse a plataforma através do login e senha. |
| **Passos** | - 1. Acessar o sistema. <br> - 2. Inserir e-mail <br> - 3. Inserir senha <br> - 4. Acionar o comando Entrar. |
| **Critérios de Êxito** | O sistema deve autenticar corretamente e deve ter acesso de acordo com as permissões concedidas. |

| **Caso de Teste** | CT 02 - Cadastrar Venda para exibir o Faturamento |
|------------------ | ------------------------ |
| **Requisitos Associados** | RF001 - O sistema deve exibir o total monetário de vendas ou serviços do mês e ano. |
| **Objetivo do Teste** | Realizar cadastro de venda. |
| **Passos** | - 1.	Acessar o sistema . <br> - 2. Inserir e-mail <br> - 3. Inserir senha <br> - 4. Acionar o comando Entrar. <br> - 5. Acionar o Vendas. <br> - 6.  Preencher os dados. <br> - 7. Acionar o comando Adicionar Venda. |
| **Critérios de Êxito** | O sistema deve permitir o cadastro de vendas com um alerta textual "Venda Cadastrada com sucesso". |

| **Caso de Teste** | CT 03 - Cadastrar Despesas |
|------------------ | ------------------------ |
| **Requisitos Associados** | RF009 - Cadastrar e categorizar o tipo de despesa (materia prima, material revenda, uso consumo, material de limpeza, energia eletrica, água, etc). |
| **Objetivo do Teste** | Realizar cadastro de despesas com suas respectivas categorias. |
| **Passos** | - 1.	Acessar o sistema . <br> - 2. Inserir e-mail <br> - 3. Inserir senha <br> - 4. Acionar o comando Entrar. <br> - 5. Acionar o Despesas. <br> - 6. Preencher os dados. <br> - 7. Acionar o comando Adicionar Despesa. |
| **Critérios de Êxito** | O sistema deve permitir o cadastro de despesas com um alerta textual "Despesa Cadastrada com sucesso". |

| **Caso de Teste** | CT 04 - Cadastrar Clientes |
|------------------ | ------------------------ |
| **Requisitos Associados** | RF006 - Permitir fazer uma agenda de clientes. |
| **Objetivo do Teste** | Permitir o cadastro de clientes para a criação de uma agenda. |
| **Passos** | - 1.	Acessar o sistema. <br> - 2. Inserir e-mail <br> - 3. Inserir senha <br> - 4. Acionar o comando Entrar. <br> - 5. Acionar o menu Gerenciamento. <br> - 6. Acionar o sub menu Clientes. <br> - 7. Preencher os campos. <br> - 8. Acionar o comando Salvar.|
| **Critérios de Êxito** | O sistema deve permitir o cadastro de clientes com um alerta textual "Cliente Cadastrado com sucesso". |

| **Caso de Teste** | CT 05 - Cadastrar Produtos e Serviços |
|------------------ | ------------------------ |
| **Requisitos Associados** | RF007 - Permitir cadastrar serviços prestados e produtos vendidos. |
| **Objetivo do Teste** | Permitir o cadastro de serviços e produtos. |
| **Passos** | - 1.	Acessar o sistema. <br> - 2. Inserir e-mail <br> - 3. Inserir senha <br> - 4. Acionar o comando Entrar. <br> - 5. Acionar o menu Gerenciamento. <br> - 6. Acionar o sub menu Produto. <br> - 7. Preencher os campos. <br> - 8. Acionar o comando Salvar. <br> - 9. Acionar o sub menu Serviços. <br> - 10. Preencher os campos. <br> - 11. Acionar o comando Salvar.|
| **Critérios de Êxito** | O sistema deve permitir o cadastro de produtos e serviços com um alerta textual "Produto/Serviço Cadastrado com sucesso". |

| **Caso de Teste** | CT 06 - Procurar um contador próximo a minha localização. |
|------------------ | ------------------------ |
| **Requisitos Associados** | RF008 - Ter a opção "Encontrar um contador próximo a você" e mostrar um mapa com os contadores próximos, para caso o MEI precise de um. |
| **Objetivo do Teste** | Permitir que o usuário encontre um contador próximo a ele. |
| **Passos** | - 1.	Acessar o sistema; <br> - 2. Inserir e-mail <br> - 3. Inserir senha <br> - 4. Acionar o comando Entrar. <br> - 5. Acionar o menu Gerenciamento. <br> - 6. Acionar o sub menu Contador. <br> - 7. Preencher a localização. <br> - 8. Acionar o comando Pesquisar. |
| **Critérios de Êxito** | O sistema deve mostrar os contadores próximos ao usuário. |
 
## Ferramentas de Testes (Opcional)

Comente sobre as ferramentas de testes utilizadas.
 

