var mysql = require("mysql")
var inquirer = require("inquirer")

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
    console.log(res)
    inquirer.prompt([
        {
            name: "q1",
            message: "What's the ID of the product you want to purchase?",
            type: "input"
        },
        {
            name: "q2",
            message: "How many do you want to buy?",
            type: "input"
        }
    ]).then(function(answers){
        // console.log(answers.q1)
        for (var i=0; i < res.length; i++){
            if(answers.q1 == res[i].item_id){
                console.log(res[i])
                if( answers.q2 > res[i].stock_quanity){
                    console.log("Sorry not enough.")
                } else {
                    // make a connection.query and this query will update 
                    // the object with new stock_quanity
                    // after you update the database, 
                    // tell the customer that you have charged them x amount of dollars
                    //console log res[i] to see updated

                    console.log("We have enough in stock.")
                }
            } 
        }
    })
})


connection.end()

