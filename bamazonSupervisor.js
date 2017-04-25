//import libraries
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

// mySQL config variable
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: '',
    database: "Bamazon"
});

askQuestions();

//show user list of actions
//based on user input runs appropriate function.
function askQuestions() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'Select an action:',
        choices: ['View Product Sales by Department', 'Create New Department']
    }]).then((answers) => {
        switch (answers.action) {
            case 'View Product Sales by Department':
                productsSales();
                break;
            case 'Create New Department':
                newDepartment();
                break;
        }
    })
}

//show data from departments table
//calculating total profit and add column to the output 
function productsSales() {
    //table variable for printing database data nicely
    var table = new Table({ head: ["Id", "Department Name", "Overhead Costs", "Product Sales", " Total Profit"] });

    connection.query('SELECT department_id, department_name, over_head_cost, total_sales, (total_sales - over_head_cost) as total_profit FROM departments',
        (err, row) => {
            if (err) throw err;
            row.forEach(function(data) {
                var elem = [];
                elem.push(data.department_id, data.department_name, data.over_head_cost, data.total_sales, data.total_profit);
                table.push(elem);
            });
            console.log(table.toString());
        })
}