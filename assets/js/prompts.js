// Required modules
const inquirer = require("inquirer");
const views = require("./viewQueries");
const adds = require("./addQueries");
const updates = require("./updateQueries");
const deletes = require("./deleteQueries");
//const tbl = require("console.table");

let sqlConnection; 

// Set sqlConnection and call mainMenu
function initPrompts(connection){
    sqlConnection = connection;
    mainMenu();
}

// Prompt users with primary menu
function mainMenu(){
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
    .then((response) => menuChoice(response));
}

// Call view function based on menu response
function menuChoice(response){
    switch (response.action) {
        case "View":
          views.viewMenu(sqlConnection, mainMenu);
          break;

        case "Add":
          adds.addMenu(sqlConnection, mainMenu);
          break;

        case "Update":
          updates.updateMenu(sqlConnection, mainMenu);
          break;

        case "Delete":
          deletes.deleteMenu(sqlConnection, mainMenu);
          break;

        case "Exit":
          sqlConnection.end();
          process.exit();

        default:
          console.log(`Invalid action: ${response.action}`);
          break;
      }
}

module.exports = {initPrompts};
