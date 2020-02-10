# goBarber

|    Autor     | Versão |    Data    |
| :----------: | :----: | :--------: |
| Thallys Braz |  1.0   | 21/01/2020 |
| Thallys Braz |  1.1   | 31/01/2020 |
| Thallys Braz |  1.2   | 10/02/2020 |
| Thallys Braz |  1.3   | 10/02/2020 |

### Biblioteca de Desenvolvimento

|                              Biblioteca                              |
| :------------------------------------------------------------------: |
|                    [eslint](https://eslint.org/)                     |
|                    [nodemon](https://nodemon.io/)                    |
| [sequelize-cli](https://sequelize.org/master/manual/migrations.html) |
|           [sucrase](https://www.npmjs.com/package/sucrase)           |

### Bibliotecas de produção

|                                          Biblioteca                                          |
| :------------------------------------------------------------------------------------------: |
|                      [bcryptjs](https://www.npmjs.com/package/bcryptjs)                      |
|                           [express](https://expressjs.com/pt-br/)                            |
|                  [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)                  |
|                            [pg](https://www.npmjs.com/package/pg)                            |
|                     [pg-hstore](https://www.npmjs.com/package/pg-hstore)                     |
|                             [sequelize](https://sequelize.org/)                              |
|                           [Yup](https://www.npmjs.com/package/yup)                           |
|                        [Multer](https://www.npmjs.com/package/multer)                        |
|                      [Date-FNS](https://www.npmjs.com/package/date-fns)                      |
|                     [bee-queue](https://github.com/bee-queue/bee-queue)                      |
|                  [Sentry/node](https://www.npmjs.com/package/@sentry/node)                   |
|                        [Dotenv](https://www.npmjs.com/package/dotenv)                        |
|          [Express-async-errors](https://www.npmjs.com/package/express-async-errors)          |
|            [Express-handlebars](https://www.npmjs.com/package/express-handlebars)            |
|                    [handlebars](https://www.npmjs.com/package/handlebars)                    |
|                      [mongoose](https://www.npmjs.com/package/mongoose)                      |
| [nodemailer-express-handlebars](https://www.npmjs.com/package/nodemailer-express-handlebars) |
|                         [youch](https://www.npmjs.com/package/youch)                         |

## Atalhos VS Code

<p>CRTL + SHIFT + L</p>
<p>ALT + SHIFT + (SETA)</p>

## Sistema de filas

kue -- bee queue

## Comando Sequelize

<p>yarn sequelize migration:create --name=create-users</p>
<p>yarn sequelize db:migrate</p>

## Softwares necessários

<p align="justify">Para executar a aplicação, deve ter os seguintes softwares instalados:</p>

|             Banco de Dados             |
| :------------------------------------: |
| [Postgres](https://www.postgresql.org) |
|   [MongoDB](https://www.mongodb.com)   |
|       [Reddis](https://redis.io)       |

<ul>

<li>NodeJS</li>

```bash
NodeJS na versão 10.16.2 ou mais recente.
```

<li>YARN</li>

```bash
Yarn na versão 1.17.3 ou mais recente.
```

<li>Docker CE</li>

```bash
Docker CE na versão 19.03.5 ou mais recente.
```

<li>Insomnia</li>

```bash
Software do Insomina instalado, porém utilizar o Postman também.
```

<li>Sugestão</li>

```bash
Tenha o MongoDB Compass e PostBird instalados, pois ajuda a gerenciar os bancos de dados.
```

</ul>

## Executar o projeto

### Variaveis de ambiente

Antes de executar o projeto, troca o nome do arquivo

```bash
.env.example
```

Para

```bash
.env
```

E configure as variáveis de ambiente para fazer a integração com os bancos de dados, envio de email e sentry.

### Para rodar o projeto, execute os comando abaixo em ordem:

```bash
yarn sequelize db:migrate
```

Abra outro terminal e execute:

```bash
yarn dev
```

Abra mais um terminal e execute:

```bash
yarn queue
```

## Insomnia

Para testar o projeto em ambiente de desenvolvimento, baixe o [Insomnia](https://insomnia.rest) e depois click no botão abaixo:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=goBarberInsomnia&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fthallysbraz%2FgoBarber%2Fbanco%2FinsomniaRoutes.json)
