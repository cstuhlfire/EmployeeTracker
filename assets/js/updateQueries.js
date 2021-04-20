const tbl = require("console.table");
const inquirer = require("inquirer");
const views = require("./viewQueries");

// Query functions
// Create menu to choose what to update
function updateMenu(sqlConnection, mainMenu){
    console.log(`\n`);
    inquirer.prompt({
        name: "updateType",
        type: "list",
        message: "Choose the data to update:",
        choices: [
            "Update Employee Role",
            "Update Employee Manager",
            "Update Employee First Name",
            "Update Employee Last Name",
            "Main Menu",
        ],
    })
    .then((response) => updateActions(response, sqlConnection, mainMenu));
}
 
// Switch Case based on user response to direct additional prompts
function updateActions(response, sqlConnection, mainMenu){
     switch (response.updateType) {
        case "Update Employee Role":
            promptUpdateRole(sqlConnection, mainMenu);
            break;

        case "Update Employee Manager":
            promptUpdateManager(sqlConnection, mainMenu);
            break;

        case "Update Employee First Name":
            promptUpdateFirst(sqlConnection, mainMenu);
            break;

        case "Update Employee Last Name":
            promptUpdateLast(sqlConnection, mainMenu);
            break;

        case "Main Menu":
            mainMenu();
            break;

        default:
            console.log(`Invalid action: ${response.action}`);
            break;
      }   
}

// Query function - query = sql, valuesArr = values array to insert
function runQuery(query, valuesArr, sqlConnection, mainMenu, viewFunction){
    sqlConnection.query(query, valuesArr, (err, res) => {
        if (err) throw err;

        // Call the function to view table data
        viewFunction(sqlConnection, mainMenu);
    });
}

// Build insert query to add employee to employees table
function updateEmployeeRole(response, sqlConnection, mainMenu){
    let valuesArr = [response.roleId, response.employeeId];
    let query = "UPDATE employees SET role_id = ? WHERE id = ?";

    // run query with valuesArr and viewEmployees function
    runQuery(query, valuesArr, sqlConnection, mainMenu, views.viewEmployees);
}

// Build insert query to add employee to employees table
function updateEmployeeManager(response, sqlConnection, mainMenu){
    let valuesArr = [response.managerId, response.employeeId];
    let query = "UPDATE employees SET manager_id = ? WHERE id = ?";

    // run query with valuesArr and viewEmployees function
    runQuery(query, valuesArr, sqlConnection, mainMenu, views.viewEmployees);
}

// Build insert query to add employee to employees table
function updateEmployeeFirst(response, sqlConnection, mainMenu){
    let valuesArr = [response.firstName, response.employeeId];
    let query = "UPDATE employees SET first_name = ? WHERE id = ?";

    if (response.firstName === "") {
        console.log("\nMissing input: Please enter a new value for first name.");
        promptUpdateFirst(sqlConnection, mainMenu);
    } 
    else{
        // run query with valuesArr and viewEmployees function
        runQuery(query, valuesArr, sqlConnection, mainMenu, views.viewEmployees);
    }
}

// Build insert query to add employee to employees table
function updateEmployeeLast(response, sqlConnection, mainMenu){
    let valuesArr = [response.lastName, response.employeeId];
    let query = "UPDATE employees SET last_name = ? WHERE id = ?";

    if (response.lastName === "") {
        console.log("\nMissing input: Please enter a value for last name.");
        promptUpdateLast(sqlConnection, mainMenu);
    } 
    else{
        // run query with valuesArr and viewEmployees function
        runQuery(query, valuesArr, sqlConnection, mainMenu, views.viewEmployees);
    }
}

// Prompt for employee and role to update
function promptUpdateRole(sqlConnection, mainMenu){
    let employees = [];
    let roles = [];

    // Create queries so users can select employees to update and roles to assign
    let queryEmps = "SELECT * FROM employees";
    let queryRoles = "SELECT * FROM roles;";
 
    // Select employees
    sqlConnection.query(queryEmps, (err, resEmps) => {
        if (err) throw err;

        employees = resEmps;
 
        // Select roles
        sqlConnection.query(queryRoles, (err, resRoles) => {
            if (err) throw err;

            roles = resRoles;

            // Prompt for employee and role to update
            inquirer.prompt([
               {
                    name: "employeeId",
                    type: "list",
                    message: "Choose an employee to update:",
                    choices: employees.map(employee => ({value: employee.id, name: employee.first_name+" "+employee.last_name})),
                },
                {
                    name: "roleId",
                    type: "list",
                    message: "Choose a role for the employee:",
                    choices: roles.map(role => ({value: role.id, name: role.title})),
                }
 
            ])
            .then((response) => updateEmployeeRole(response, sqlConnection, mainMenu));
        });
    });
}

// Prompt for employee and manager to update
function promptUpdateManager(sqlConnection, mainMenu){
    let employees = [];
    let managers = [];
 
    // Create queries so users can select employees to update and managers to assign
    let queryEmps = "SELECT * FROM employees";
 
    // Select employees
    sqlConnection.query(queryEmps, (err, resEmps) => {
        if (err) throw err;

        employees = resEmps;
        managers = resEmps;

        // Prompt for employee and manager to update
        inquirer.prompt([
            {
                name: "employeeId",
                type: "list",
                message: "Choose an employee to update:",
                choices: employees.map(employee => ({value: employee.id, name: employee.first_name+" "+employee.last_name})),
            },
            {
                name: "managerId",
                type: "list",
                message: "Choose a manager to assign to the employee:",
                choices: managers.map(manager => ({value: manager.id, name: manager.first_name+" "+manager.last_name})),
            }

        ])
        .then((response) => updateEmployeeManager(response, sqlConnection, mainMenu));
    });
}

// Prompt for employee and manager to update
function promptUpdateFirst(sqlConnection, mainMenu){
    let employees = [];
 
    // Create queries so users can select employees to update and managers to assign
    let queryEmps = "SELECT * FROM employees";
 
    // Select employees
    sqlConnection.query(queryEmps, (err, resEmps) => {
        if (err) throw err;

        employees = resEmps;
        // Prompt for employee and manager to update
        inquirer.prompt([
            {
                name: "employeeId",
                type: "list",
                message: "Choose an employee to update:",
                choices: employees.map(employee => ({value: employee.id, name: employee.first_name+" "+employee.last_name})),
            },
            {
                name: "firstName",
                type: "input",
                message: "Enter a new first name:",
            }
        ])
        .then((response) => updateEmployeeFirst(response, sqlConnection, mainMenu));
    });
}

// Prompt for employee and manager to update
function promptUpdateLast(sqlConnection, mainMenu){
    let employees = [];
 
    // Create queries so users can select employees to update and managers to assign
    let queryEmps = "SELECT * FROM employees";
 
    // Select employees
    sqlConnection.query(queryEmps, (err, resEmps) => {
        if (err) throw err;

        employees = resEmps;
        // Prompt for employee and manager to update
        inquirer.prompt([
            {
                name: "employeeId",
                type: "list",
                message: "Choose an employee to update:",
                choices: employees.map(employee => ({value: employee.id, name: employee.first_name+" "+employee.last_name})),
            },
            {
                name: "lastName",
                type: "input",
                message: "Enter a new last name:",
            }
        ])
        .then((response) => updateEmployeeLast(response, sqlConnection, mainMenu));
    });
}

module.exports = {updateMenu};