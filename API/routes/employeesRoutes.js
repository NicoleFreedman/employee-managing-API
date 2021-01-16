// import dependencies
const express = require('express');

// create modular, mountable route handler
const router = express.Router();

// import employees controller
const {
  list_all_employees,
  add_employee,
  find_employee,
  update_employee,
  delete_employee,
} = require('../controllers/employeesController');

// employees routes
router.post('/', add_employee);
router.get('/', list_all_employees);
router.get('/search', find_employee);
router.put('/:id', update_employee);
router.delete('/:id', delete_employee);

module.exports = router;
