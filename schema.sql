DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT,
  name VARCHAR(30),
  department_name VARCHAR(30),
  price FLOAT(10,2),
  stock_quanity INT(15) NULL,
  PRIMARY KEY(item_id)
);

