-- drop schema if exists exercicio1;
-- drop database if exists asa;

create database asa;

create schema exercicio1;

-- client table

create table exercicio1."client"
(
	id serial,
	name varchar(20) not null,
	last_name varchar(50),
	registration_number varchar(14) not null unique,
	is_company boolean,
	email varchar(35) not null,
	cellphone varchar(11) not null,
	full_address varchar(50),
	city varchar(30),
	province varchar(2),
	cep varchar(9),
	created timestamp,
	updated timestamp
);

create unique index client_id_uindex
	on exercicio1."client" (id);

create index client_registration_number_uindex
	on exercicio1."client" (registration_number);

alter table exercicio1."client"
	add constraint client_pk
		primary key (id);



-- Product table

create table exercicio1."product"
(
	id serial,
	name varchar(20),
	model varchar(20),
	description varchar(50),
	quantity int,
	price numeric,
	created timestamp,
	updated timestamp
);

create unique index product_id_uindex
	on exercicio1."product" (id);

create index product_name_uindex
	on exercicio1."product" (name);

create index product_model_uindex
	on exercicio1."product" (model);

alter table exercicio1."product"
	add constraint product_pk
		primary key (id);



-- Sale table

create table exercicio1."sale"
(
	id serial,
	client_id int not null,
	product_id int not null,
	product_quantity int not null,
	total_price numeric not null,
	composition_identifier varchar(50) not null,
	sale_time timestamp,
	deliver_time timestamp
);

create unique index sale_id_uindex
	on exercicio1."sale" (id);

create index sale_composition_identifier_uindex
	on exercicio1."sale" (composition_identifier);

alter table exercicio1."sale"
	add constraint sale_pk
		primary key (id);

alter table exercicio1."sale"
	add constraint sale_client_fk
		foreign key (client_id) references exercicio1.client;

alter table exercicio1."sale"
	add constraint sale_product_fk
		foreign key (product_id) references exercicio1.product;