const tbl = require("console.table");
const inquirer = require("inquirer");
const views = require("./viewQueries");

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
 
// Switch Case based on user response to direct additional prompts
function addActions(response, sqlConnection, mainMenu){
     switch (response.addType) {
        case "Add Departments":
            promptNewDepartment(sqlConnection, mainMenu);
            break;

        case "Add Roles":
            promptNewRole(sqlConnection, mainMenu);
            break;

        case "Add Employees":
            promptNewEmployee(sqlConnection, mainMenu);
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
    sqlConnection.query(query, [valuesArr], (err, res) => {
        if (err) throw err;

        // Call the function to view table data
        viewFunction(sqlConnection, mainMenu);
    });
}

// Prompt for department to add
function promptNewDepartment(sqlConnection, mainMenu){
     inquirer.prompt({
        name: "newDepartment",
        type: "input",
        message: "Enter the name of the new department: ",
        })
    .then((response) => addDepartment(response, sqlConnection, mainMenu));
}

// Build query to insert new department
function addDepartment(response, sqlConnection, mainMenu){
    let valuesArr = [[response.newDepartment]];
    let query = "INSERT INTO departments (name) VALUES ?";

    // run insert query with valuesArr and viewDepatments function
    runQuery(query, valuesArr, sqlConnection, mainMenu, views.viewDepartments);
}

// Prompt for new role to add
function promptNewRole(sqlConnection, mainMenu){
    let departments = [];
    let query = "SELECT * FROM departments;";
 
    // Select departments so user can pick department to assign to role
    sqlConnection.query(query, (err, res) => {
        if (err) throw err;

        departments = res;

        inquirer.prompt([
            {
                name: "newRole",
                type: "input",
                message: "Enter the name of the new role: ",
            },
            {
                name: "newSalary",
                type: "input",
                message: "Enter the salary of the new role: ",
            },
            {
                name: "departmentId",
                type: "list",
                message: "Choose a department for the new role:",
                choices: departments.map(department => ({value: department.id, name: department.name})),
                }
        ])
        .then((response) => addRole(response, sqlConnection, mainMenu));
    });
}

// Build insert query to add role
function addRole(response, sqlConnection, mainMenu){
    let valuesArr = [[response.newRole, response.newSalary, response.departmentId]];
    let query = "INSERT INTO roles (title, salary, department_id) VALUES ?";

    // run query with valuesArr and viewRoles function
    runQuery(query, valuesArr, sqlConnection, mainMenu, views.viewRoles);
}

// Prompt for employee data to add
function promptNewEmployee(sqlConnection, mainMenu){
    let roles = [];
    let employees = [];

    // Create queries so users can select roles and managers (employees) to assign to the new employee
    let queryRoles = "SELECT * FROM roles;";
    let queryManagers = "SELECT * FROM employees";
 
    // Select roles
    sqlConnection.query(queryRoles, (err, resRoles) => {
        if (err) throw err;

        roles = resRoles;

        // Select managers (employees)
        sqlConnection.query(queryManagers, (err, resManager) => {
        if (err) throw err;

        employees = resManager;

            // Prompt for new employee details
            inquirer.prompt([
                {
                    name: "newFirstName",
                    type: "input",
                    message: "Enter the first name of the new employee: ",
                },
                {
                    name: "newLastName",
                    type: "input",
                    message: "Enter the last name of the new employee: ",
                },
                {
                    name: "roleId",
                    type: "list",
                    message: "Choose a role for the new employee:",
                    choices: roles.map(role => ({value: role.id, name: role.title})),
                },
                {
                    name: "managerId",
                    type: "list",
                    message: "Choose a manager for the new employee:",
                    choices: employees.map(employee => ({value: employee.id, name: employee.first_name+" "+employee.last_name})),
                }
            ])
            .then((response) => addEmployee(response, sqlConnection, mainMenu));
        });
     });
}

// Build insert query to add employee to employees table
function addEmployee(response, sqlConnection, mainMenu){
    let valuesArr = [[response.newFirstName, response.newLastName, response.roleId, response.managerId]];
    let query = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ?";

    // run query with valuesArr and viewEmployees function
    runQuery(query, valuesArr, sqlConnection, mainMenu, views.viewEmployees);
}

module.exports = {addMenu};