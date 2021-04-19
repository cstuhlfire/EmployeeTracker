const tbl = require("console.table");
const inquirer = require("inquirer");

// Query functions
// Create menu to choose what to add
function addMenu(sqlConnection, mainMenu){
    console.log(`\n`);
    inquirer.prompt({
        name: "addType",
        type: "list",
        message: "Choose the data to add:",
        choices: [
            "Add Departments",
            "Add Roles",
            "Add Employees",
            "Main Menu",
        ],
    })
    .then((response) => addActions(response, sqlConnection, mainMenu));
}

function addActions(response, sqlConnection, mainMenu){
    console.log("\nAdd the Things");

    switch (response.addType) {
        case "Add Departments":
            addDepartments(sqlConnection, mainMenu);
            break;

        case "Add Roles":
            addRoles(sqlConnection, mainMenu);
            break;

        case "Add Employees":
            addEmployees(sqlConnection, mainMenu);
            break;

        case "Main Menu":
            mainMenu();
            break;

        default:
            console.log(`Invalid action: ${response.action}`);
            break;
      }   
}

function addDepartments(sqlConnection, mainMenu){
    console.log("Add Departments");
    mainMenu();
}

function addRoles(sqlConnection, mainMenu){
    console.log("Add Roles");
    mainMenu();
}

function addEmployees(sqlConnection, mainMenu){
    console.log("Add Employees");
    mainMenu();
}

module.exports = {addMenu};