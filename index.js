const inquirer = require('inquirer')
const db = require('./db/connection')
const cTable = require('console.table')

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role']
        }
    ])
        .then(data => {
            console.log(data)
            if (data.action === "View All Departments") {
                viewDept()
            } else if (data.action === "View All Roles") {
                viewRoles()
            } else if (data.action === "View All Employees") {
                viewEmployees()
            } else if (data.action === "Add A Department") {
                addDept()
            } else if (data.action === "Add A Role") {
                addRole()
            } else if (data.action === "Add An Employee") {
                addEmployee()
            } else if (data.action === "Update An Employee Role") {
                updateRole()
            }
        })
}
const viewDept = () => {
    const sql = `SELECT * FROM dept`;

    db.query(sql, (err, res) => {
        if (err) {
            return;
        }
        console.table(res)
        promptUser()
    });
}
const viewRoles = () => {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, res) => {
        if (err) {
            return;
        }
        console.table(res)
        promptUser()
    });
}
const viewEmployees = () => {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, res) => {
        if (err) {
            return;
        }
        console.table(res)
        promptUser()
    });
}
const addDept = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'What would you like to name the department?',
        }
    ])
        .then(data => {
            console.log(data)
        })
}

const addRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What would you like to name the role?',
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What would you like the salary to be?',
        },
        {
            type: 'input',
            name: 'roleDept',
            message: 'What department would the role belong to?',
        }
    ])
        .then(data => {
            console.log(data)
        })
}

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'First name of new employee',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Last name of new employee',
        },
        {
            type: 'input',
            name: 'employeeRole',
            message: 'Role of new employee',
        },
        {
            type: 'input',
            name: 'employeeDept',
            message: 'Department of new employee',
        }
    ])
        .then(data => {
            console.log(data)
        })
}
promptUser()