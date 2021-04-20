const tbl = require("console.table");
const inquirer = require("inquirer");

// Query functions
// Create menu to choose what to view
function viewMenu(sqlConnection, mainMenu){
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
    .then((response) => viewActions(response, sqlConnection, mainMenu));
}

// Use the case switch/case to choose the chosen view
function viewActions(response, sqlConnection, mainMenu){
    switch (response.viewType) {
        case "View Departments":
            viewDepartments(sqlConnection, mainMenu);
            break;

        case "View Roles":
            viewRoles(sqlConnection, mainMenu);
            break;

        case "View Employees":
            viewEmployees(sqlConnection, mainMenu);
            break;

        case "View Employees by Manager":
            viewEmployeesByManager(sqlConnection, mainMenu);
            break;

        case "View Total Utilized Budget by Department":
            viewUtilizedBudget(sqlConnection, mainMenu);
            break;

        case "Main Menu":
            mainMenu();
            break;

        default:
            console.log(`Invalid action: ${response.action}`);
            break;
      }   
}

// Query function 
function selectQueryDisplay(query, sqlConnection, mainMenu){
    sqlConnection.query(query, (err, res) => {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.table(res);
        mainMenu();
    });
}

// Select the departments
function viewDepartments(sqlConnection, mainMenu){
    let query = "SELECT name AS 'Departments' FROM departments;";

    selectQueryDisplay(query, sqlConnection, mainMenu);
}

// Select the roles
function viewRoles(sqlConnection, mainMenu){
    let query = "SELECT title AS 'Role/Title', FORMAT(Salary, 0) AS Salary, departments.name AS Department ";
    query += "FROM roles ";
    query += "LEFT JOIN departments ";
    query += "ON roles.department_id = departments.id ";
    query += "ORDER BY departments.name;";

    selectQueryDisplay(query, sqlConnection, mainMenu);
}

// Select the employee details from employees, roles, and departments
function viewEmployees(sqlConnection, mainMenu){
    let query = "SELECT employees.id AS 'ID', ";
    query += "CONCAT(employees.first_name,' ',employees.last_name) AS 'Employee Name', ";
    query += "title AS 'Title', ";
    query += "departments.name AS 'Department', ";
    query += "FORMAT(salary, 0) AS 'Salary', ";
    query += "CONCAT(manager.first_name,' ',manager.last_name) AS 'Manager Name' ";
    query += "FROM employees AS manager ";
    query += "RIGHT JOIN employees ON employees.manager_id = manager.id ";
    query += "LEFT JOIN roles ON employees.role_id = roles.id ";
    query += "LEFT JOIN departments ON roles.department_id = departments.id ";
    query += "ORDER BY employees.id;";
    
    selectQueryDisplay(query, sqlConnection, mainMenu);
}

// Select employees by manager
function viewEmployeesByManager(sqlConnection, mainMenu){
    let employees = [];
    let query = "SELECT * FROM employees;";

    // Select employees
    sqlConnection.query(query, (err, res) => {
        if (err) throw err;

        employees = res;
        // employees.forEach(employee => employee.name = employee.first_name+" "+employee.last_name);

        // Prompt for manager name from employees array
        inquirer.prompt({
            name: "managerId",
            type: "list",
            message: "Choose a manager to see who reports to them:",
            choices: employees.map(employee => ({value: employee.id, name: employee.first_name+" "+employee.last_name})),
            })
            .then((response) => {
                query = "SELECT CONCAT(employees.first_name,' ',employees.last_name) AS 'Employee Name', ";
                query += "title AS 'Title', ";
                query += "departments.name AS 'Department', ";
                query += "FORMAT(salary, 0) AS 'Salary' ";
                query += "FROM employees ";
                query += "LEFT JOIN roles ON employees.role_id = roles.id ";
                query += "LEFT JOIN departments ON roles.department_id = departments.id ";
                query += "WHERE ?;";

                //query = "SELECT first_name AS 'First Name', last_name AS 'Last Name' FROM employees WHERE ?";
                sqlConnection.query(query, {manager_id: response.managerId}, (err, res) => {
                    if (err) throw err;
            
                    // Log all results of the SELECT statement
                    console.table(res);
                    mainMenu();
                });
            });
    });
}
                    
// Build query to view sum of salaries grouped by department
function viewUtilizedBudget(sqlConnection, mainMenu){
    let query = "SELECT departments.name AS 'Department Name', IFNULL(FORMAT(SUM(roles.salary), 0), 0) AS 'Utilized Budget' ";
    query += "FROM departments ";
    query += "LEFT JOIN roles ON roles.department_id = departments.id ";
    query += "GROUP BY departments.name;";

    selectQueryDisplay(query, sqlConnection, mainMenu);
}

module.exports = {viewMenu,                    
                viewDepartments,
                viewRoles,
                viewEmployees
                };