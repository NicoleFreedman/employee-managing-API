// import dependencies
const express = require('express');
const bodyParser = require('body-parser');

// import employees API
const employees = require('./API/routes/employeesRoutes');

// create an express server
const app = express();

// define a port
const port = process.env.PORT || 8080;

// app.use() is a function that used to attach middlewares to an express application
// attaching the middleware for body-parser, it allows us to use its functionalities
app.use(bodyParser.json());

// Root endpoint
app.get('/', (req, res, next) => {
  res.send('Please use /api/employees');
});

// connect the employees API to the app
app.use('/api/employees', employees);

// error handler for nonexistent path
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});

// specifying where should the app listen to
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
