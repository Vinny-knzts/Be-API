# Boas vindas ao Projeto Be-API

Be-API é uma API conectada a um banco de dados que permite gerenciar vendas
<br/>
Ao realizar login, usuários podem gerenciar clientes, produtos e vendas

# Requisitos

Node.js >= 20.6
<br/>
Mysql

# Instalação

1. Clone este repositório
2. Em um terminal, acesse a pasta raiz do projeto
3. Instale as depedencias utilizando o comando "npm install" 

# Configuração

Para configurar o projeto em seu ambiente, é preciso editar o .env
<br/>
Primeiramente, renomeie o arquivo .env.example para .env, em seguida, defina as váriaves conforme a seguir:
<br/>
<br/>
PORT: Porta da aplicação
<br/>
HOST: Hospedagem da aplicação
<br/>
SECRET: Chave para a assinatura e autorização de um JWT (JSON Web Token)
<br/>
DB_HOST: Hospedagem do bando de dados
<br/>
DB_PORT: Porta do bando de dados
<br/>
DB_USER: Usuário do bando de dados
<br/>
DB_PASSWORD= Senha do usuário do bando de dados
<br/>
DB_DATABASE= Nome do banco que será utilizado

# Banco de dados

Após definir as váriaveis do banco de dados, execute o comando "node ace migration:run" para criar as tabelas no banco

## Tabelas

### users

id: ID do usuário
<br/>
email: Email do usuário
<br/>
passowrd: Senha do usuário

### clients

id: ID do cliente
<br/>
name: Nome do cliente
<br/>
cpf: CPF do cliente

### adresses

id: ID do endereço
<br/>
client_id: ID do cliente associado ao endereço
<br/>
cep: CEP do endereço
<br/>
bairro: Bairro do do endereço
<br/>
avenida: Avenida/rua do endereço
<br/>
numero: Número do endereço

### phone_numbers

id: ID do número de telefone
<br/>
client_id: ID do cliente associado ao número de telefone
<br/>
phone_number: Número de telefone

### products

id: ID do produto
<br/>
name: Nome do produto
<br/>
stock: Estoque do produto
<br/>
price: Preço unitário do produto
<br/>
deleted: Status de exclusão de um produto

### orders

id: ID da venda
<br/>
client_id: ID do cliente associado à venda
<br/>
product_id: ID do produto associado à venda
<br/>
quantity: Quantidade de produtos da venda
<br/>
unit_price: Preço unitário do produto
<br/>
total_price: Preço total da venda
<br/>
date: Data da venda

<br/>
<br/>

#### OBS: Por padrão, todas tabelas tem as seguintes colunas:

created_at: Data de criação do dado
<br/>
updated_at: Data da última atalização do dado

# Rodando o projeto

Para iniciar o projeto, utilize o comando "npm run dev" para rodar o projeto no ambiente de desenvolvimento

### JWT

Ao realizar o login, será fornecido um token que deve ser passado pelo header Authorization
<br/>
Todas as rotas exceto a de login requisitam um token válido

# Rotas

## Users

### POST em users/

Registra um novo usuário
<br/>
Requisitos - Body: { email: email, password: senha }

### POST em users/login

Login de um usuário
<br/>
Requisitos - Body: { email: email, password: senha }

## Clients

### GET em clients/

Lista todos os clientes registrados

### GET em clients/:id

Detalha um cliente, seu endereço (se houver), seu telefone (se houver) e seus pedidos (se houver) e a possibilidade de filtrar por mês + ano
<br/>
:id -> ID do cliente
<br/>
Query string: { year: ano, month: mês } -> opcional, apenas para filtragem de vendas | Exemplo: clients/1?year=2024&month=06

### POST em clients/

Registra um novo cliente
<br/>
Body: { name: nome, cpf: CPF }

### PUT em clients/:id

Edita um cliente
<br/>
:id -> ID do cliente
<br/>
Body: { name: nome , cpf: CPF} -> apenas os atributos que precisam ser alterados

### DELETE em clients/:id

Remove um cliente, seu endereço (se houver), seu telefone (se houver) e seus pedidos (se houver)
<br/>
:id -> ID do cliente

## Adresses

### POST em adresses/

Registra um endereço a um cliente
<br/>
Body: { clientId: ID do cliente, cep: CEP, bairro: Bairro, avenida: Avenida/Rua, numero: Número }

### PUT em adresses/:id

Edita um endereço
<br/>
:id -> ID do endereço
<br/>
Body: { cep: CEP, bairro: Bairro, avenida: Avenida/Rua, numero: Número } -> apenas os atributos que precisam ser alterados

### DELETE em adresses/:id

Remove um endereço
<br/>
:id -> ID do endereço

## Phone Numbers

### POST em phone_numbers/

Registra um telefone a um cliente
<br/>
Body: { clientId: ID do cliente, phoneNumber: número de telefone }

### PUT em phone_numbers/:id

Edita um número de telefone
<br/>
:id -> ID do telefone
<br/>
Body: { phoneNumber: número de telefone }

### DELETE em phone_numbers/:id

Remove um número
<br/>
:id -> ID do telefone

## Products

### GET em products/

Lista todos os produtos registrados

### GET em products/:id

Detalha um produto
<br/>
:id -> ID do produto

### POST em products/

Registra um produto
<br/>
Body: { name: nome, price: preço, stock: estoque } -> stock é opcional, valor padrão é 0

### PUT em products/:id

Edita um produto
<br/>
:id -> ID do produto
<br/>
Body: { name: nome, price: preço, stock: estoque } -> apenas os atributos que precisam ser alterados

### DELETE em products/:id

Exclusão lógica de um produto
<br/>
:id -> ID do produto

### POST em products/:id 

Restaura um produto que foi excluido
<br/>
:id -> ID do produto

## Orders

### POST em orders/

Registra uma venda a um cliente e a um produto
<br/>
Body: { clientId: ID do cliente, productId: ID do produto, quantity: Quantia do produto }



