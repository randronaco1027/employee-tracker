const inquirer = require('inquirer')

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role']
        },
        {
            type: 'input',
            name: 'deptName',
            message: 'What would you like to name the department?',
            when: (input) => input.action === 'Add A Department'
        },
        {
            type: 'input',
            name: 'roleName',
            message: 'What would you like to name the role?',
            when: (input) => input.action === 'Add A Role'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What would you like the salary to be?',
            when: (input) => input.action === 'Add A Role'
        },
        {
            type: 'input',
            name: 'roleDept',
            message: 'What department would the role belong to?',
            when: (input) => input.action === 'Add A Role'
        },
        {
            type: 'input',
            name: 'firstName',
            message: 'First name of new employee',
            when: (input) => input.action === 'Add An Employee'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Last name of new employee',
            when: (input) => input.action === 'Add An Employee'
        },
        {
            type: 'input',
            name: 'employeeRole',
            message: 'Role of new employee',
            when: (input) => input.action === 'Add An Employee'
        },
        {
            type: 'input',
            name: 'employeeDept',
            message: 'Department of new employee',
            when: (input) => input.action === 'Add An Employee'
        }
    ])
}

promptUser()
.then(data => {
    console.log(data)
})