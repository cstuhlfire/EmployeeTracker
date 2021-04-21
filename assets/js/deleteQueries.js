const tbl = require("console.table");
const inquirer = require("inquirer");
const views = require("./viewQueries");

// Query functions
// Create menu to choose what to update
function deleteMenu(sqlConnection, mainMenu){
    console.log(`\n`);
    inquirer.prompt({
        name: "deleteType",
        type: "list",
        message: "Choose the data to delete:",
        choices: [
            "Delete Department",
            "Delete Role",
            "Delete Employee",
            "Main Menu",
        ],
    })
    .then((response) => deleteActions(response, sqlConnection, mainMenu));
}
 
// Switch Case based on user response to direct additional prompts
function deleteActions(response, sqlConnection, mainMenu){
     switch (response.deleteType) {
        case "Delete Department":
            promptDeleteDepartment(sqlConnection, mainMenu);
            break;

        case "Delete Role":
            promptDeleteRole(sqlConnection, mainMenu);
            break;

        case "Delete Employee":
            promptDeleteEmployee(sqlConnection, mainMenu);
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
function deleteDepartment(response, sqlConnection, mainMenu){
    let valuesArr = [response.departmentId];
    let query = "DELETE FROM departments WHERE id = ?";

    console.log(`\n`);
    inquirer.prompt({
        name: "deleteConfirm",
        type: "confirm",
        message: `Are you sure you want to delete this department?`,
     })
     .then((res) => {
         if (res.deleteConfirm) {
            // run query with valuesArr and viewEmployees function
            runQuery(query, valuesArr, sqlConnection, mainMenu, views.viewDepartments);
        } else {
            mainMenu();
        }
    });
}

// Build insert query to add employee to employees table
function deleteRole(response, sqlConnection, mainMenu){
    let valuesArr = [response.roleId];
    let query = "DELETE FROM roles WHERE id = ?";

    console.log(`\n`);
    inquirer.prompt({
        name: "deleteConfirm",
        type: "confirm",
        message: `Are you sure you want to delete this role?`,
     })
     .then((res) => {
         if (res.deleteConfirm) {
             // run query with valuesArr and viewEmployees function
             runQuery(query, valuesArr, sqlConnection, mainMenu, views.viewRoles);
        } else {
            mainMenu();
        }
    });
}

// Build insert query to add employee to employees table
function deleteEmployee(response, sqlConnection, mainMenu){
    let valuesArr = [response.employeeId];
    let query = "DELETE FROM employees WHERE id = ?";

    console.log(`\n`);
    inquirer.prompt({
        name: "deleteConfirm",
        type: "confirm",
        message: `Are you sure you want to delete this employee?`,
     })
     .then((res) => {
         if (res.deleteConfirm) {
             // run query with valuesArr and viewEmployees function
             runQuery(query, valuesArr, sqlConnection, mainMenu, views.viewEmployees);
        } else {
            mainMenu();
        }
    });
}

// Prompt for department to delete
function promptDeleteDepartment(sqlConnection, mainMenu){
    let departments = [];
  
    // Create queries so users can select a department to delete
    let queryDept = "SELECT * FROM departments";
 
    // Select departments
    sqlConnection.query(queryDept, (err, resDept) => {
        if (err) throw err;

        departments = resDept;
 
        // Prompt for department to delete
        inquirer.prompt([
            {
                name: "departmentId",
                type: "list",
                message: "Choose a department to delete:",
                choices: departments.map(department => ({value: department.id, name: department.name})),
            }
        ])
        .then((response) => deleteDepartment(response, sqlConnection, mainMenu));
    });
}

// Prompt for role to delete
function promptDeleteRole(sqlConnection, mainMenu){
    let roles = [];
  
    // Create queries so users can select a role to delete
    let queryRole = "SELECT * FROM roles";
 
    // Select roles
    sqlConnection.query(queryRole, (err, resRole) => {
        if (err) throw err;

        roles = resRole;
 
        // Prompt for role to delete
        inquirer.prompt([
            {
                name: "roleId",
                type: "list",
                message: "Choose a role to delete:",
                choices: roles.map(role => ({value: role.id, name: role.title})),
            }
        ])
        .then((response) => deleteRole(response, sqlConnection, mainMenu));
    });
}

// Prompt for employee to delete
function promptDeleteEmployee(sqlConnection, mainMenu){
    let employees = [];
  
    // Create queries so users can select an employee to delete
    let queryEmp = "SELECT * FROM employees";
 
    // Select employees
    sqlConnection.query(queryEmp, (err, resEmp) => {
        if (err) throw err;

        employees = resEmp;
 
        // Prompt for employees to delete
        inquirer.prompt([
            {
                name: "employeeId",
                type: "list",
                message: "Choose an employee to delete:",
                choices: employees.map(employee => ({value: employee.id, name: employee.first_name+" "+employee.last_name})),
            }
        ])
        .then((response) => deleteEmployee(response, sqlConnection, mainMenu));
    });
}

module.exports = {deleteMenu};