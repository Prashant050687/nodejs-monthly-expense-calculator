require('dotenv').config();
const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 5000;

//Connect to DB
const { mongoUri, connectDB } = require('./config/mongodb');
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors middleware
app.use(
  cors({
    origin: ['http://localhost:5000', 'http://localhost:4200'],
    credentials: true,
  })
);

//Home page
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Expenses API' });
});

//Initialize Swagger
const initializeSwagger = require('./config/swagger');
initializeSwagger(app);

//APi routes
const expensesRouter = require('./routes/expenses');
app.use('/api/expenses', expensesRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));

//app.all('*', authenticationRequired); // Require authentication for all routes

module.exports = app;
