INSERT INTO dept 
    (name)
VALUES
    ('HR'),
    ('Finance'),
    ('Admin'),
    ('Media'),
    ('IT'),
    ('Research');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Financial Analyst', 50000, 2),
    ('Finance Manager', 80000, 2),
    ('HR Manager', 80000, 1),
    ('Admin Assisstant', 50000, 3),
    ('CTO', 300000, 5),
    ('CFO', 350000, 2),
    ('Research Analyst', 75000, 6),
    ('Media Manager', 75000, 4),
    ('CMO', 300000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Roy', 'Smith', 6, NULL),
    ('Janet', 'Yellen', 5, NULL),
    ('Bob', 'Johnson', 9, NULL),
    ('Steve', 'Wozniak', 7, 2),
    ('Bill', 'Gates', 4, 1)
