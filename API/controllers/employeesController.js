// import dependencies
const express = require('express');

// create modular, mountable route handler
const router = express.Router();

// import employees data
let employees = require('../data/employeesData.json');

// fs module is a file management system in node.js
const fs = require('fs');

// save changes made via post/put/delete request to the employees file as DB is not used
const save = () => {
  fs.writeFile('./API/data/employeesData.json', JSON.stringify(employees), error => {
    if (error) {
      throw error;
    }
  });
};

const add_employee = (req, res) => {
  const employee = req.body;
  const { name, position, city, department } = employee;
  if (!name || !position || !city || !department) {
    return res.status(400).json('Incorrect form submission');
  }
  employees.push(employee);
  save();
  res.json({
    status: 'Successfully added',
    stateInfo: req.body,
  });
};

const list_all_employees = (req, res) => {
  res.json(employees);
};

const find_employee = (req, res) => {
  const { query, type } = req.query;
  const employee_info = employees.filter(employee => {
    if (typeof query === 'string') {
      return employee[type].toLowerCase() === query.toLowerCase();
    } else return employee[type] === query;
  });
  res.json(employee_info);
};

const update_employee = (req, res) => {
  const { id } = req.params;
  const { name, position, city, department, assigned } = req.body;
  if (!name || !position || !city || !department) {
    return res.status(400).json('Incorrect form submission');
  }
  employees = employees.map(employee => {
    if (employee.id === id) {
      employee.name = name;
      employee.position = position;
      employee.city = city;
      employee.department = department;
      employee.assigned = assigned;
    }
    return employee;
  });
  save();
  res.json({
    status: 'Successfully updated',
    stateInfo: req.body,
  });
};

const delete_employee = (req, res) => {
  const { id } = req.params;
  employees = employees.filter(employee => {
    return employee.id !== id;
  });
  save();
  res.json({
    status: 'Successfully deleted',
    removed: id,
  });
};

module.exports = {
  list_all_employees,
  add_employee,
  find_employee,
  update_employee,
  delete_employee,
};
