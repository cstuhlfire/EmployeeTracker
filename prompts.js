const inquirer = require("inquirer");

// Prompt users with primary menu
function primaryMenu(connection){
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
    .then((response) => secondaryMenu(response, connection));
}

function secondaryMenu(response, connection){
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
          connection.end();
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
            "Exit",
        ],
    })
    .then((response) => {
        viewActions(response);
        primaryMenu();
    });
}

function viewActions(response){
    console.log("\nView the Things");
    primaryMenu();
}

function addMenu(){
    console.log("\nAdd");
    primaryMenu();
}

function updateMenu(){
    console.log("\nUpdate");
    primaryMenu();
}

function deleteMenu(){
    console.log("\nDelete");
    primaryMenu();
}

module.exports = {primaryMenu};
