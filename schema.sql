DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
  team_id INT AUTO_INCREMENT,
  team_name VARCHAR(30),
  league VARCHAR(30),
  price FLOAT(10,2),
  stock INT(15) NULL,
  PRIMARY KEY(team_id)
);

