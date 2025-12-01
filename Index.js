const express = require('express');
const connectDB = require('./Db/connect');
const taskRouter = require('./routes/task');
require('dotenv').config();

const app = express();
const port = 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Task Routes
app.use('/api/tasks', taskRouter);

// Health Check
app.get('/health', (req, res) => {
  res.send('OK');
});


// MongoDB Connection
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

