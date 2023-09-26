const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const notFoundMiddleware = require('./middleware/404');
const errorHandlerMiddleware = require('./middleware/500');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
const authRouter = require('./auth/router');
app.use('/auth', authRouter);

// Custom Middleware
const basicAuth = require('./auth/middleware/basic');

// Error Handling Middleware
app.use(notFoundMiddleware); // 404 Not Found Middleware
app.use(errorHandlerMiddleware); // 500 Internal Server Error Middleware

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
