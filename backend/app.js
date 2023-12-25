const express = require('express');
// require('express-async-errors');
const routes = require('./routes');
const { environment } = require('./config');
const cors = require('cors');
const { ValidationError } = require('sequelize');
const { Client } = require('pg');
const env = process.env.POSTGRES_USER || '';

//local dev so no production
const isProduction = environment === 'production';

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors 
    app.use(cors());
}
  
app.use(routes); // Connect all the routes

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found SAM.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
  });

// Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      err.errors = err.errors.map((e) => e.message);
      err.title = 'Validation error!!';
    }
    next(err);
  });

// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack
    });
}); 





module.exports = app;