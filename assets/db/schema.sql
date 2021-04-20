DROP DATABASE IF EXISTS employeeTracker_DB;

CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE departments(
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE roles(
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary decimal,
    department_id INTEGER NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) 
        REFERENCES departments(id)
        ON UPDATE SET NULL
        ON DELETE SET NULL
);

CREATE TABLE employees(
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NULL,
    manager_id INTEGER NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
        ON UPDATE SET NULL
        ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employees(id)
        ON UPDATE SET NULL
        ON DELETE SET NULL
);
