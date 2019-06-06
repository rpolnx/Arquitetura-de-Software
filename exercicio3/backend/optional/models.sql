-- drop schema if exists ex3;
-- drop database if exists asa;

create database asa;

create schema ex3;

-- categories

create table ex3."categories"
(
	id serial primary key,
	title varchar(30),
	description varchar(50)
);

create unique index category_id_uindex
	on ex3."categories" (id);

-- suppliers

create table ex3."suppliers"
(
	id serial primary key,
	cnpj varchar(14) unique,
	name varchar(40),
	social_reason varchar(50),
	telephone varchar(15),
	address varchar(50),
	contact varchar(50)
);

create unique index supplier_id_uindex
	on ex3."suppliers" (id);

create unique index cnpj_uindex
	on ex3."suppliers" (cnpj);

-- products

create table ex3."products"
(
	id serial primary key,
	supplier integer,
	category integer,
	name varchar(30),
	description varchar(100),
	value numeric,
	quantity integer,
	minimal_quantity integer
);

create unique index client_id_uindex
	on ex3."products" (id);

alter table ex3."products"
	add constraint supplier_product_fk
		foreign key (supplier) references ex3.suppliers;

alter table ex3."products"
	add constraint category_product_fk
		foreign key (category) references ex3.categories;

-- purchases

create table ex3."purchases"
(
	id serial primary key,
	supplier int not null,
	product int not null,
	category int not null,
	purchase_time timestamp,
	total_value numeric,
	quantity integer
);

create unique index purchase_id_uindex
	on ex3."purchases" (id);

alter table ex3."purchases"
	add constraint purchase_supplier_fk
		foreign key (supplier) references ex3.suppliers;

alter table ex3."purchases"
	add constraint purchase_product_fk
		foreign key (product) references ex3.products;

alter table ex3."purchases"
	add constraint purchase_categorie_fk
		foreign key (category) references ex3.categories;


-- sellers

create table ex3."sellers"
(
	id serial primary key,
	cpf varchar(11) unique,
	name varchar(35),
	work_card varchar(20),
	telephone varchar(15),
	admission date
);

create unique index id_seller_uindex
	on ex3."sellers" (id);

create unique index cpf_uindex
	on ex3."sellers" (cpf);


-- sales

create table ex3."sales"
(
	id serial primary key,
	seller integer,
	category integer,
	product integer,
	sale_time timestamp,
	total_value numeric,
	quantity integer
);

create unique index id_sale_uindex
	on ex3."sales" (id);

alter table ex3."sales"
	add constraint sale_seller_fk
		foreign key (seller) references ex3.sellers;

alter table ex3."sales"
	add constraint sale_category_fk
		foreign key (category) references ex3.categories;

alter table ex3."sales"
	add constraint sale_product_fk
		foreign key (product) references ex3.products;


create table ex3."users"
(
	id serial primary key,
	username varchar(25) not null,
	password varchar(256) not null,
	email varchar(50) not null,
	role varchar(25) not null,
	join_time timestamp
);

create unique index id_user_uindex
	on ex3."users" (id);

create unique index username_uindex
	on ex3."users" (username);

create unique index email_uindex
	on ex3."users" (email);