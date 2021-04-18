const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employeetracker_DB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Welcome to the Employee Tracker Database!");
  primaryMenu();
});

function primaryMenu(){
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            'List',
            'Add',
            'Update',
            'Delete',
            'Exit',
        ],
    })
    .then((response) => secondaryMenu(response));
}

function secondaryMenu(response){
    switch (response.action) {
        case "List":
          listMenu();
          break;

        case "Add":
          addMenu();
          break;

        case "Update":
          updateMenu();
          break;

        case "Delete":
          deleteMenu();
          break;

        case "Exit":
          connection.end();
          process.exit();

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
}

function listMenu(){
    console.log("List");
    primaryMenu();
}

function addMenu(){
    console.log("Add");
    primaryMenu();
}

function updateMenu(){
    console.log("Update");
    primaryMenu();
}

function deleteMenu(){
    console.log("Delete");
    primaryMenu();
}