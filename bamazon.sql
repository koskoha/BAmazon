CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
	item_id INT(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50),
    department_id INT(10),
    price DECIMAL(10,2),
    stock_quantity INT(8),
    product_sales DECIMAL(10,2),
    PRIMARY KEY(item_id)
);

CREATE TABLE departments(
	department_id INT(10) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30),
    over_head_cost DECIMAL(10,2),
    total_sales DECIMAL(10,2),
    PRIMARY KEY(department_id)
);

INSERT INTO departments (department_name, over_head_cost, total_sales)
VALUES
	('Electronics',200,0),
    ('Mobile',1150,0),
    ('House',800,0),
    ('Office',20,0);
    


INSERT INTO products(product_name, department_id, price, stock_quantity, product_sales)
VALUES
	('HP laptop', 1, 300.00, 60,0),
    ('Samsung Note7', 2, 600.50, 300,0),
    ('Mouse Logitech', 1, 25.99, 150,0),
    ('Iphone charger', 2, 28.60, 400,0),
    ('Pixel', 2, 600.89, 1000,0),
    ('Lamp', 4, 23.50, 60,0),
    ('Office chair' , 4, 149.99, 45,0),
    ('Books', 4, 15.00, 100,0),
    ('DEL laptop',1, 400.87, 100,0),
    ('Dining table set', 3, 350.90, 20,0),
    ('Silver spoon', 3, 15.00, 1000,0);
		