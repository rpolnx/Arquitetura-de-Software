-- drop schema if exists ex2;
-- drop database if exists asa;

create database asa;

create schema ex2;

-- tb_categorias

create table ex2."tb_categorias"
(
	id_categoria serial,
	tituloCategoria varchar(30),
	descricaoCategoria varchar(50),
	fg_ativo integer
);

create unique index id_categoria_uindex
	on ex2."tb_categorias" (id_categoria);

alter table ex2."tb_categorias"
	add constraint categoria_pk
		primary key (id_categoria);


-- tb_fornecedores

create table ex2."tb_fornecedores"
(
	id_fornecedor serial,
	cnpj varchar(14) unique,
	razaoSocial varchar(50),
	telefone varchar(15),
	endereco varchar(50),
	contato varchar(50),
	fg_ativo integer
);

create unique index fornecedor_id_uindex
	on ex2."tb_fornecedores" (id_fornecedor);

create unique index cnpj_uindex
	on ex2."tb_fornecedores" (cnpj);

alter table ex2."tb_fornecedores"
	add constraint fornecedor_pk
		primary key (id_fornecedor);


-- tb_produtos

create table ex2."tb_produtos"
(
	id_produto serial,
	id_fornecedor integer,
	id_categoria integer,
	nomeProduto varchar(30),
	descricaoProduto varchar(100),
	valorUnitario numeric,
	quantidade integer,
	quantidadeMinima integer,
	fg_ativo integer
);

create unique index client_id_uindex
	on ex2."tb_produtos" (id_produto);

alter table ex2."tb_produtos"
	add constraint client_pk
		primary key (id_produto);

alter table ex2."tb_produtos"
	add constraint fornecedores_produtos_fk
		foreign key (id_fornecedor) references ex2.tb_fornecedores;
	
alter table ex2."tb_produtos"
	add constraint categorias_produtos_fk
		foreign key (id_categoria) references ex2.tb_categorias;


-- tb_compras

create table ex2."tb_compras"
(
	id_compra serial,
	id_fornecedor int not null,
	id_produto int not null,
	id_categoria int not null,
	dataCompra: date,
	valorTotal: numeric,
	quantidade: integer,
	fg_ativo integer
);

create unique index id_compra_uindex
	on ex2."tb_compras" (id_compra);

alter table ex2."tb_compras"
	add constraint compras_pk
		primary key (id_compra);

alter table ex2."tb_compras"
	add constraint compras_fornecedores_fk
		foreign key (id_fornecedor) references ex2.tb_fornecedores;

alter table ex2."tb_compras"
	add constraint compras_produtos_fk
		foreign key (id_produto) references ex2.tb_produtos;

alter table ex2."tb_compras"
	add constraint compras_categorias_fk
		foreign key (id_categoria) references ex2.tb_categorias;


-- tb_vendedores

create table ex2."tb_vendedores"
(
	id_vendedor serial,
	cpf varchar(11),
	nome varchar(35),
	carteiraTrabalho: varchar(20),
	telefone: varchar(15),
	dataAdmissao: date,
	fg_ativo integer
);

create unique index id_vendedor_uindex
	on ex2."tb_vendedores" (id_vendedor);

alter table ex2."tb_vendedores"
	add constraint vendedor_pk
		primary key (id_vendedor);


-- tb_vendas

create table ex2."tb_vendas"
(
	id_venda serial,
	id_vendedor integer,
	id_categoria integer,
	id_produto integer,
	dataVenda: date,
	valorTotal: numeric,
	quantidade: integer,
	fg_ativo integer
);

create unique index id_venda_uindex
	on ex2."tb_vendas" (id_venda);

alter table ex2."tb_vendas"
	add constraint venda_pk
		primary key (id_venda);

alter table ex2."tb_vendas"
	add constraint vendas_vendedores_fk
		foreign key (id_vendedor) references ex2.tb_vendedores;

alter table ex2."tb_vendas"
	add constraint vendas_categorias_fk
		foreign key (id_categoria) references ex2.tb_categorias;

alter table ex2."tb_vendas"
	add constraint vendas_produtos_fk
		foreign key (id_produto) references ex2.tb_produtos;