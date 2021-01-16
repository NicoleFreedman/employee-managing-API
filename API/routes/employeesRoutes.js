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
// employees routes
router.route('/')
  .get(list_all_employees)
  .post(add_employee);
router.route('/search').get(find_employee);
router.route('/:id')
  .put(update_employee)
  .delete(delete_employee);

module.exports = router;
