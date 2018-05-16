var mysql = require("mysql")
var inquirer = require("inquirer")
var arrayToTable = require('array-to-table')

var connection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "",
    database: "bamazon_db"
})

connection.connect(function(err){
    if (err) throw err
})

connection.query("SELECT * FROM products", function(err, res){
    // takes response and creates a table
    console.log(arrayToTable(res))
    inquirer.prompt([
        {
            name: "q1",
            message: "Enter the ID of the team you would like to purchase.",
            type: "input"
        },
        {
            name: "q2",
            message: "Enter desired quantity. ",
            type: "input"
        }
    ]).then(function(answers){
        for (var i=0; i < res.length; i++){
            if(answers.q1 == res[i].team_id){
                if( answers.q2 > res[i].stock){
                    console.log("\nInsufficient quantity! \nOnly " + res[i].stock + " available. \n\nOrder not placed.\n")
                    connection.end()
                } else {          
                    var newQuantity = res[i].stock - answers.q2
                    var amtCharged = res[i].price * answers.q2
                    var name = res[i].team_name
                    var id = res[i].team_id

                    connection.query("UPDATE products SET ? WHERE ?", [{stock: newQuantity}, {team_id: id}], function(err,res){
                        if (err) throw err
                        console.log("\nPuchased: " + name)
                        console.log("Charged: $" + amtCharged)
                        console.log("Left in Stock: " + newQuantity + "\n") 
                        connection.end()
                    })
                }
            } 
        }
    })
})




