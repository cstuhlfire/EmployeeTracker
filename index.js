// Require modules
const mysql = require("mysql");
const menu = require("./assets/js/prompts")

// Create connection object for mysql connection info
const connection = mysql.createConnection({
  host: "localhost",

  // Listen on port 3306
  port: 3306,

  // Set username
  user: "root",

  // Set password and database
  password: "",
  database: "employeetracker_DB",
});

// Connect to mysql
connection.connect((err) => {
  if (err) throw err;

  console.log("\nWelcome to the Employee Tracker Database!\n");
  menu.initPrompts(connection);
});

