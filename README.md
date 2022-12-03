# :game_die: Boardcamp Back

# Índice

- [Sobre](#Sobre)
- [Rotas](#Rotas)
    - [Listar categorias](#Listar-categorias)
    - [Inserir categoria](#Inserir-categoria)
    - [Listar jogos](#Listar-jogos)
    - [Inserir um jogo](#Inserir-um-jogo)
    - [Listar clientes](#Listar-clientes)
    - [Buscar um cliente por id](#Buscar-um-cliente-por-id)
    - [Inserir um jogo](#Inserir-um-cliente)
    - [Atualizar um cliente](#Atualizar-um-cliente)
    - [Listar aluguéis](#Listar-aluguéis)
    - [Inserir um aluguél](#Inserir-um-aluguél)
    - [Finalizar aluguel](#Finalizar-aluguel)
    - [Apagar aluguel](#Apagar-aluguel)
- [Como rodar em desenvolvimento](#Como-rodar-em-desenvolvimento)

<br/>

# Sobre
API para a gestão de uma locadora de jogos de tabuleiro.

<br/>

# Rotas

## Listar categorias
- Rota: `/categories`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  [
    {
      "id": 1,
      "name": "Estratégia"
    },
    {
      "id": 2,
      "name": "Investigação"
    }
  ]
  ```
- Query strings aceitas:
	- *limit*: Limita a quantidade de resultados na resposta
	- *offset*: Retorna somente os resultados após o offset determinado
	- *order*: Ordena os resultados pela string passada
		- Valores aceitos: id (padrão), name
	- *desc*: Ordena os resultados em ordem decrescente
		- Valores aceitos: false (padrão), true

## Inserir categoria
- Rota: `/categories`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "name": "Investigação"
  }
  ```

- Possíveis erros:
	- Campo *name* ausente, vazio ou com tipo diferente de string
	- Categoria já existe

## Listar jogos
- Rota: `/games`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  [
    {
      "id": 1,
      "name": "Banco Imobiliário",
      "image": "http://image.png",
      "stockTotal": 3,
      "categoryId": 1,
      "pricePerDay": 1500,
      "categoryName": "Estratégia"
    }
  ]
  ```
- Query strings aceitas:
	- *name*: Filtra os jogos que começam com a string passada
	- *limit*: Limita a quantidade de resultados na resposta
	- *offset*: Retorna somente os resultados após o offset determinado
	- *order*: Ordena os resultados pela string passada
		- Valores aceitos: id (padrão), name, stockTotal, categoryId, pricePerDay
	- *desc*: Ordena os resultados em ordem decrescente
		- Valores aceitos: false (padrão), true

## Inserir um jogo
- Rota: `/games`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "name": "Banco Imobiliário",
    "image": "http://image.png",
    "stockTotal": 3,
    "categoryId": 1,
    "pricePerDay": 1500
  }
  ```
- Possíveis erros:
	- Campos do body ausentes, vazios ou com tipos inválidos
	- Campos *stockTotal* e *pricePerDay* devem ser maiores que 0
	- Campo *categoryId* não corresponde a uma categoria existente
	- Campo *name* já corresponde a um jogo existente

## Listar clientes
- Rota: `/customers`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  [
    {
      "id": 1,
      "name": "João Alfredo",
      "phone": "21998899222",
      "cpf": "01234567890",
      "birthday": "1992-10-05"
    },
    {
      "id": 2,
      "name": "Maria Alfreda",
      "phone": "21998899221",
      "cpf": "12345678910",
      "birthday": "1994-12-25"
    }
  ]
  ```
- Query strings aceitas:
	- *cpf*: Filtra os clientes que começam com a string passada
	- *limit*: Limita a quantidade de resultados na resposta
	- *offset*: Retorna somente os resultados após o offset determinado
	- *order*: Ordena os resultados pela string passada
		- Valores aceitos: id (padrão), name, phone, cpf, birthday
	- *desc*: Ordena os resultados em ordem decrescente
		- Valores aceitos: false (padrão), true

## Buscar um cliente por id
- Rota: `/customers/:id`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  {
    "id": 1,
    "name": "João Alfredo",
    "phone": "21998899222",
    "cpf": "01234567890",
    "birthday": "1992-10-05"
  }
  ```
- Possíveis erros:
	- Não existe cliente com o id passado

## Inserir um cliente
- Rota: `/customers`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "name": "João Alfredo",
    "phone": "21998899222",
    "cpf": "01234567890",
    "birthday": "1992-10-05"
  }
  ```
- Possíveis erros:
	- Campos do body ausentes, vazios ou com tipos inválidos
	- Campo *cpf* deve ter 11 caracteres numéricos
	- Campo *phone* deve ter 10 ou 11 caracteres numéricos
	- Campo *cpf* já corresponde a um cliente existente

## Atualizar um cliente
- Rota: `/customers/:id`
- Método: `PUT`
- Exemplo de Body:

  ```json
  {
    "name": "João Alfredo",
    "phone": "21998899222",
    "cpf": "01234567890",
    "birthday": "1992-10-05"
  }
  ```
- Possíveis erros:
	- Campos do body ausentes, vazios ou com tipos inválidos
	- Campo *cpf* deve ter 11 caracteres numéricos
	- Campo *phone* deve ter 10 ou 11 caracteres numéricos
	- Campo *cpf* já corresponde a um cliente existente

## Listar aluguéis
- Rota: `/rentals`
- Método: `GET`
- Exemplo de Resposta:

  ```json
  [
    {
      "id": 1,
      "customerId": 1,
      "gameId": 1,
      "rentDate": "2021-06-20",
      "daysRented": 3,
      "returnDate": null,
      "originalPrice": 4500,
      "delayFee": null,
      "customer": {
        "id": 1,
        "name": "João Alfredo"
      },
      "game": {
        "id": 1,
        "name": "Banco Imobiliário",
        "categoryId": 1,
        "categoryName": "Estratégia"
      }
    }
  ]
  ```
- Query strings aceitas:
	- *customerId*: Filtra os aluguéis pelo id do cliente
	- *gameId*: Filtra os aluguéis pelo id do jogo
	- *limit*: Limita a quantidade de resultados na resposta
	- *offset*: Retorna somente os resultados após o offset determinado
	- *order*: Ordena os resultados pela string passada
		- Valores aceitos: id (padrão), rentDate, returnDate, daysRented
	- *desc*: Ordena os resultados em ordem decrescente
		- Valores aceitos: false (padrão), true

## Inserir um aluguél
- Rota: `/rentals`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "customerId": 1,
    "gameId": 1,
    "daysRented": 3
  }
  ```
- Possíveis erros:
	- Campos do body ausentes, vazios ou com tipos inválidos
	- Campo *customerId* não corresponde a um cliente existente
	- Campo *gameId* não corresponde a um jogo existente
	- Campo *daysRented* deve ser maior que 0
	- Não existem jogos disponíveis para alugar

## Finalizar aluguel
- Rota: `/rentals/:id/return`
- Método: `POST`
- Exemplo de Body:

  ```json
  {
    "customerId": 1,
    "gameId": 1,
    "daysRented": 3
  }
  ```
- Possíveis erros:
	- Não existe aluguél com o id passado
	- O aluguél com o id passado já está finalizado

## Apagar aluguel
- Rota: `/rentals/:id`
- Método: `DELETE`
- Possíveis erros:
	- Não existe aluguél com o id passado
	- O aluguél com o id passado não está finalizado

<br/>

# Como rodar em desenvolvimento

**Atenção:** para rodar o projeto é preciso ter o [PostgreSQL](https://www.postgresql.org/download/) instalado em sua máquina.

1. Clone esse repositório:
>```bash
> git clone https://github.com/AnaLTFernandes/boardcamp-back.git
>```

2. Instale as dependências:
>```bash
>$ npm install
>```

3. Crie um banco de dados PostgreSQL com o nome que desejar

4. Rode o comando na raiz do projeto para criar as tabelas:
>```bash
>#troque nome_do_banco pelo nome do banco de dados criado no passo anterior
>$ sudo su -c "psql -d nome_do_banco -f dump.sql" postgres
>```

5. Configure o arquivo `.env` usando como base o arquivo `.env.example`

6. Inicie o projeto:
>```bash
>$ npm run dev
>```

7. Divirta-se nas rotas usando de URL base: http://localhost:4000
