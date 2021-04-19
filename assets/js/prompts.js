const inquirer = require("inquirer");
let sqlConnection; 

// Set sqlConnection and call primaryMenu
function initPrompts(connection){
    sqlConnection = connection;
    primaryMenu();
}

// Prompt users with primary menu
function primaryMenu(){

    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View",
            "Add",
            "Update",
            "Delete",
            "Exit",
        ],
    })
    .then((response) => secondaryMenu(response));
}

function secondaryMenu(response){
    switch (response.action) {
        case "View":
          viewMenu();
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
          sqlConnection.end();
          process.exit();

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
}

function viewMenu(){
    console.log(`\n`);
    inquirer.prompt({
        name: "viewType",
        type: "list",
        message: "Choose the data to view:",
        choices: [
            "View Departments",
            "View Roles",
            "View Employees",
            "View Employees by Manager",
            "View Total Utilized Budget by Department",
            "Main Menu",
        ],
    })
    .then((response) => viewActions(response));
}

function viewActions(response){
    console.log("\nView the Things");
    primaryMenu();
}

function addMenu(){
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
    .then((response) => addActions(response));
}

function addActions(response){
    console.log("\nAdd the Things");
    primaryMenu();
}

function updateMenu(){
    console.log(`\n`);
    inquirer.prompt({
        name: "updateType",
        type: "list",
        message: "Choose the data to update:",
        choices: [
            "Update Employee Roles",
            "Update Employee Managers",
            "Main Menu",
        ],
    })
    .then((response) => updateActions(response));
}

function updateActions(response){
    console.log("\nUpdate the Things");
    primaryMenu();
}

function deleteMenu(){
    console.log(`\n`);
    inquirer.prompt({
        name: "deleteType",
        type: "list",
        message: "Choose the data to delete:",
        choices: [
            "Delete Departments",
            "Delete Roles",
            "Delete Employees",
            "Main Menu",
        ],
    })
    .then((response) => deleteActions(response));
}

function deleteActions(response){
    console.log("\nDelete the Things");
    primaryMenu();
}

module.exports = {initPrompts};
