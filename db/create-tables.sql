create table "Users" (
  id serial not null primary key,
  username varchar(30),
  email varchar(256),
  "hashedPassword" bytea,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

create table "Accounts" (
  id serial not null primary key,
  name varchar(255),
  previous_balance numeric(19,4),
  current_balance numeric(19,4),
  available_cash numeric(19,4),
  "userId" int,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

create table "Stocks" (
  id serial not null primary key,
  name varchar(255),
  symbol varchar(255),
  "createdAt" timestamp,
  "updatedAt" timestamp
);

create table "Stock_in_Accounts" (
  id serial not null primary key,
  "stockId" int,
  "accountId" int,
  "totalCost" numeric(19,4),  
  quantity int,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

