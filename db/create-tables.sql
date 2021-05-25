create table "Users" (
  id serial not null  primary key,
  username varchar(30) unique,
  email varchar(256) unique,
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
  "userId" int unique,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  foreign key ("userId") references "Users" (id)
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
  "updatedAt" timestamp,
  foreign key ("stockId") references "Stocks" (id),
  foreign key ("accountId") references "Accounts" (id)
);
