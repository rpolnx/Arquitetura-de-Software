# Software Architecture
Third Exercise: creates an architecture based on Microservices with Frontend using Boostrap and Backend using Docker and ORM.

# Requirements

## Install dependencys
```
    npm install yarn -g
    yarn install
```

## Setup
- Configure Docker on a VM or local (Unix based Systems)

### Database
- On 'postgres-config.js' file inside the folder 'config', modify the attribute 'host' to where your postgres database is.
- Execute the SQL file 'models.sql' inside the folder 'optional'.


# Running project
- Development mode:
```
npm run dev
```

- Production mode (will be upgraded):
```
npm run start
```

# Table Relationship 

![Relational Model Based](https://github.com/rodrigorpo/Arquitetura-de-Software/blob/master/exercicio2/optional/relacionamento-tabelas-ex-2.jpg?raw=true)


# Paths and endpoints

## Types
- Category
- Product
- Purchase
- Sale
- Seller
- Supplier
- User


## GET
- / (index)
- /{$type$} (Returns all of a type)
- /{$type$}/{id} (Returns a type by Id)

## POST
- /{$type$} (Creates a type based on requisition Body with validations)

## PUT
- /{$type$}/{id} (Edits a type based on an Id and requisition Body with validations)

## DELETE
- /{$type$}/{id} (Delete a type based on an Id and requisition Body with validations)