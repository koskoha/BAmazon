var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: '',
    database: "Bamazon"
});

runManager();

function runManager() {
    askQuestions();
}

function askQuestions(params) {
    inquirer.prompt([{
        type: 'list',
        name: 'input',
        message: 'Manager menu options:',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', "** Exit **"]
    }]).then((action) => {
        switch (action.input) {
            case 'View Products for Sale':
                productsForSale();
                break;
            case 'View Low Inventory':
                lowInventory();
                break;
            case 'Add to Inventory':
                addToInventory();
                break;
            case 'Add New Product':
                addNewItem();
                break;
            case 'Add New Product':
                connection.end();
                productsForSale();
                break;
        }
    });
};


function productsForSale() {
    var table = new Table({ head: ["Id", "Name", "Department", "Price", "Stock Quantity", "Product Sales"] });

    connection.query("SELECT products.item_id, products.product_name, departments.department_name, products.price, products.stock_quantity, products.product_sales FROM products INNER JOIN departments ON products.department_id = departments.department_id",
        (err, items) => {
            if (err) throw err;
            items.forEach((data) => {
                var elem = [];
                elem.push(data.item_id, data.product_name, data.department_name, data.price, data.stock_quantity, data.product_sales);
                table.push(elem);
            });
            console.log(table.toString());
            askQuestions();
        });
}

function lowInventory() {
    var table = new Table({ head: ["Id", "Name", "Department", "Price", "Stock Quantity", "Product Sales"] });

    connection.query("SELECT products.item_id, products.product_name, departments.department_name, products.price, products.stock_quantity, products.product_sales FROM products INNER JOIN departments ON products.department_id = departments.department_id",
        (err, items) => {
            if (err) throw err;
            items.forEach((data) => {
                var elem = [];
                if (data.stock_quantity < 5) {
                    elem.push(data.item_id, data.product_name, data.department_name, data.price, data.stock_quantity, data.product_sales);
                    table.push(elem);
                }
            });
            console.log(table.toString());
            askQuestions();
        });
}

function addToInventory() {
    connection.query('SELECT * FROM products', (err, items) => {
        if (err) throw err;

        var choicesArray = [];
        items.forEach((item) => {
            choicesArray.push({ name: item.product_name + " | Quantity: " + item.stock_quantity, value: item.item_id });
        })

        inquirer.prompt([{
            type: 'list',
            name: 'id',
            message: 'Select an item:',
            choices: choicesArray
        }, {
            type: "input",
            name: "amount",
            message: "How many items you want to add?"
        }]).then((action) => {
            connection.query('UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?', [action.amount, action.id], (err) => {
                if (err) throw err
                else console.log('Items quantity was successfully updated!');
                console.log('******************************************************************');
                askQuestions();
            });
        });
    });
}

function addNewItem() {
    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "Name: "
    }, {
        type: 'list',
        name: 'department',
        message: 'Department: ',
        choices: ["Electronic", "Office", "Home", "Mobile"]
    }, {
        type: "input",
        name: "price",
        message: "Price: "
    }, {
        type: "input",
        name: "quantity",
        message: "Quantity: "
    }]).then((item) => {
        connection.query("INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)", [item.name, item.department, item.price, item.quantity],
            (err) => { if (err) throw err; });
        console.log('Product was successfully added.');
        console.log('******************************************************************');
        askQuestions();
    })
}