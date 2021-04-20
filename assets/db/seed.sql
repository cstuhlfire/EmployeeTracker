INSERT INTO employeeTracker_DB.departments(name)
VALUES ("Sales"),
("Engineering"),
("Accounting"),
("Administration"),
("Human Resources"),
("Information Technology");

INSERT INTO employeeTracker_DB.roles(title, salary, department_id)
VALUES ("Sales Associate", 35000, 1),
("Sales Manager", 65000, 1),
("Director of Sales", 150000, 1),
("Associate Engineer", 60000, 2),
("Senior Engineer", 105000, 2),
("Engineering Manager", 145000, 2),
("Director of Engineering", 185000, 2),
("Accounting Associate", 40000, 3),
("Accounting Manager", 80000, 3),
("Director of Accounting", 120000, 3),
("Admin Assistant", 45000, 4),
("Scheduler", 50000, 4),
("Admin Manager", 75000, 4),
("HR Associate", 50000, 5),
("HR Manager", 80000, 5),
("Director HR", 185000, 5),
("Junior Programmer", 55000, 6),
("Senior Programmer", 90000, 6),
("IT Manager", 120000, 6),
("Director IT", 190000, 6);

INSERT INTO employeeTracker_DB.employees(first_name, last_name, role_id, manager_id)
VALUES("Caroline", "Cabrera", 3, NULL),
("Bilal", "Rich", 7, NULL),
("Micah", "Benton", 10, NULL),
("Bogdan", "Durham", 13, NULL),
("Jack", "Cassidy", 16, NULL),
("Elena", "Rossi", 20, NULL);

INSERT INTO employeeTracker_DB.employees(first_name, last_name, role_id, manager_id)
VALUES("Derry", "Garza", 2, 1),
("Bobbi", "Guy", 1, 2),
("Monika", "Finely", 6, 4),
("Gregory", "Dawson", 5, 5),
("Dwayne", "Iles", 4, 6),
("Penelope", "Becker", 9, 8),
("Iona", "Turnbull", 8, 9),
("Brenda", "Cartwright", 12, 11),
("Kais", "Rigby", 11, 12),
("Fred", "Portillo", 15, 14),
("Stella", "Wooten", 14, 15),
("Tolisa", "North", 19, 17),
("Tevin", "Blackwell", 18, 18),
("Alica", "Craig", 17, 19);
