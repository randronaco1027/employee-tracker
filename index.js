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
    .then()
}

const addDept = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'What would you like to name the department?',
        }
    ])
    .then()
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
    .then()
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
    .then()
}
// promptUser()
// .then(data => {
//     console.log(JSON.stringify(data))
// })