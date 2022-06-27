CREATE TABLE USUARIO (
USU_ID SERIAL NOT NULL PRIMARY KEY, 
EMAIL VARCHAR(255) NOT NULL UNIQUE,
SENHA VARCHAR(255) NOT NULL,
NOME VARCHAR(255) NOT NULL
);

CREATE TABLE TOKEN_DE_ACESSO (
TOKEN_ID VARCHAR(255) NOT NULL PRIMARY KEY,
USU_ID INT4 NOT NULL,
CONSTRAINT TOKEN_USU_FK FOREIGN KEY(USU_ID) REFERENCES USUARIO(USU_ID)
);

CREATE TABLE CATEGORIA (
CATEGORIA_ID SERIAL NOT NULL PRIMARY KEY,
CAT_NOME VARCHAR NOT NULL,
CAT_TIPO INT4 NOT NULL --- TIPO 0 ENTRADA, TIPO 1 SAÍDA, TIPO 2 GASTO FIXO
);

CREATE TABLE REGISTRO (
REGISTRO_ID SERIAL NOT NULL PRIMARY KEY,
VALOR FLOAT NOT NULL,
SALARIO BOOL DEFAULT FALSE NOT NULL,
ENTRADA BOOL NOT NULL,
GASTO_TEMPORARIO BOOL DEFAULT FALSE NOT NULL,
ANO INT4 NOT NULL,
MES INT4 NOT NULL,
ANO_FINAL INT4,
MES_FINAL INT4,
DESCRICAO VARCHAR(255),
CATEGORIA_ID INT4,
CONSTRAINT ENTRADA_CATEGORIA_FK FOREIGN KEY(CATEGORIA_ID) REFERENCES CATEGORIA(CATEGORIA_ID),
USU_ID INT4 NOT NULL,
CONSTRAINT ENTRADA_USU_FK FOREIGN KEY(USU_ID) REFERENCES USUARIO(USU_ID)
);

---CADASTRAR CATEGORIAS 
-- Categorias de Entradas
insert into categoria (cat_nome, cat_tipo) values ('Renda Extra', 0);
insert into categoria (cat_nome, cat_tipo) values ('Hora Extra', 0);
insert into categoria (cat_nome, cat_tipo) values ('Recebimento de Aluguéis', 0);
insert into categoria (cat_nome, cat_tipo) values ('Recebimento de Dividendos', 0);
insert into categoria (cat_nome, cat_tipo) values ('Retorno de Dinheiro Emprestado', 0);
--Categorias de Saidas
insert into categoria (cat_nome, cat_tipo) values ('Educação', 1);
insert into categoria (cat_nome, cat_tipo) values ('Saúde', 1);
insert into categoria (cat_nome, cat_tipo) values ('Transporte', 1);
insert into categoria (cat_nome, cat_tipo) values ('Vestimentas', 1);
insert into categoria (cat_nome, cat_tipo) values ('Mercado', 1);
insert into categoria (cat_nome, cat_tipo) values ('Lanches', 1);
insert into categoria (cat_nome, cat_tipo) values ('Viagens', 1);
insert into categoria (cat_nome, cat_tipo) values ('Gasto fixo variavel', 1);
insert into categoria (cat_nome, cat_tipo) values ('Contas da Casa', 1);
insert into categoria (cat_nome, cat_tipo) values ('Outro', 1);
--Categoria de Gastos Temporários
insert into categoria (cat_nome, cat_tipo) values ('Financiamento', 2);
insert into categoria (cat_nome, cat_tipo) values ('Aluguel', 2);
insert into categoria (cat_nome, cat_tipo) values ('Contas da Casa', 2);
insert into categoria (cat_nome, cat_tipo) values ('Outro', 2);
--Categorias de Planejamento
insert into categoria (cat_nome, cat_tipo) values ('Planejamento', 3);
