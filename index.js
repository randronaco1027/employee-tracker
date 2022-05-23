const inquirer = require('inquirer')
const db = require('./db/connection')
const cTable = require('console.table')

const promptUser = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'View Employees by Dept', 'View Employees by Manager', 'Cancel']
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
            } else if (data.action === 'View Employees by Dept') {
                employeesByDept()
            } else if (data.action === 'View Employees by Manager') {
                employeesByMgr()
            } else if (data.action === 'Cancel') {
                db.end()
            }
        })
}

const viewDept = () => {
    const sql = `SELECT dept.id AS ID, dept.name AS Dept FROM dept`;

    db.query(sql, (err, res) => {
        if (err) {
            return;
        }
        console.table(res)
        promptUser()
    });
}
const viewRoles = () => {
    const sql = `SELECT role.id AS ID, role.title AS Title, role.salary AS Salary, dept.name AS Dept FROM role INNER JOIN dept ON role.department_id = dept.id`;
    db.query(sql, (err, res) => {
        if (err) {
            return;
        }
        console.table(res)
        promptUser()
    });
}
const viewEmployees = () => {
    const sql = `SELECT employee.id AS ID, employee.first_name as First, employee.last_name AS Last, role.title AS Title, role.salary AS Salary, dept.name AS Dept, employee.manager_id AS Manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN dept ON role.department_id = dept.id`;
    db.query(sql, (err, res) => {
        if (err) {
            return;
        }
        console.table(res)
        promptUser()
    });
}

const employeesByDept = () => {

    const sql = `SELECT dept.name AS Dept, employee.id AS Emp_ID, employee.first_name as First, employee.last_name AS Last, role.title AS Title, role.salary AS Salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN dept ON role.department_id = dept.id ORDER BY dept.name`;
    db.query(sql, (err, res) => {
        if (err) {
            return;
        }
        console.table(res)
        promptUser()
    });
}

const employeesByMgr = () => {

    const sql = `SELECT employee.manager_id AS Manager, employee.first_name as First, employee.last_name AS Last, role.title AS Title, role.salary AS Salary FROM employee INNER JOIN role ON employee.role_id = role.id ORDER BY employee.manager_id`;
    db.query(sql, (err, res) => {
        if (err) {
            return;
        }
        console.table(res)
        promptUser()
    });
}

const addDept = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'What would you like to name the department?',
        }
    ])
        .then(data => {
            console.log(data)
            const sql = `INSERT INTO dept (name) VALUES (?)`
            const params = data.deptName
            db.query(sql, params, (err, res) => {
                if (err) {
                    return
                }
            });
            promptUser()
        })
}

const addRole = async () => {
    const sql = `SELECT * FROM dept`
    const deptArray = []
    db.query(sql, (err, data) => {
        data.forEach(department => {
            let deptData = {
                name: department.name,
                value: department.id
            }
            deptArray.push(deptData);
        });
        inquirer.prompt([
            {
                type: 'input',
                name: 'role',
                message: 'What would you like to name the role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What would you like the salary to be?',
            },
            {
                type: 'list',
                name: 'dept',
                message: 'What department does this role belong to?',
                choices: deptArray
            }
        ])
            .then(data => {
                console.log(data)

                const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
                params = [data.role, data.salary, data.dept]
                db.query(sql, params, (err, res) => {
                    if (err) {
                        return
                    }
                });
                promptUser()
            })
    })
}

const addEmployee = () => {
    const sqlRole = `SELECT * FROM role`
    const sqlMgr = `SELECT * FROM employee`
    const roleArray = []
    const mgrArray = []
    db.query(sqlMgr, (err, empData) => {
        empData.forEach(employee => {
            let employeeData = {
                name: employee.firstName + employee.lastName,
                value: employee.id
            }
            mgrArray.push(employeeData)
        })
    })
    db.query(sqlRole, (err, data) => {
        data.forEach(role => {
            let roleData = {
                name: role.title,
                value: role.id,
                salary: role.salary,
                roleDept: role.dept
            }
            roleArray.push(roleData);
        });

        inquirer.prompt([
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
                type: 'list',
                name: 'employeeRole',
                message: 'Role of new employee',
                choices: roleArray
            },
            {
                type: 'list',
                name: 'confirmMgr',
                message: 'Does this employee have a manager?',
                choices: ['Yes', 'No']
            },
            {
                type: 'list',
                name: 'employeeMgr',
                message: `Please enter Manager's ID`,
                choices: mgrArray,
                when: (input) => input.confirmMgr === 'Yes'
            }
        ])
            .then(data => {
                console.log(data)
                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                const params = [data.firstName, data.lastName, data.employeeRole, data.employeeMgr]
                db.query(sql, params, (err, res) => {
                    if (err) {
                        return
                    }
                });
                promptUser()
            })
    })
}

const updateRole = () => {
    const sqlRole = `SELECT * FROM role`
    const sqlEmp = `SELECT * FROM employee`
    const roleArray = []
    const employeeArray = []
    db.query(sqlEmp, (err, empData) => {
        empData.forEach(employee => {
            let employeeData = {
                name: employee.firstName,
                value: employee.id
            }
            employeeArray.push(employeeData)
        })
    })
    db.query(sqlRole, (err, data) => {
        data.forEach(role => {
            let roleData = {
                name: role.title,
                value: role.id,
                salary: role.salary,
                roleDept: role.dept
            }
            roleArray.push(roleData);
        });
        inquirer.prompt([
            {
                type: 'list',
                name: 'updateEmp',
                message: 'Select the employee ID you would like to update',
                choices: employeeArray
            },
            {
                type: 'list',
                name: 'updateRole',
                message: 'What would you like to change their role to?',
                choices: roleArray
            }
        ])
            .then(data => {
                console.log(data)
                const sql = `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
                const params = [data.updateRole, data.updateEmp]
                db.query(sql, params, (err, res) => {
                    if (err) {
                        return
                    }
                });
                promptUser()
            })
    })
}

promptUser()