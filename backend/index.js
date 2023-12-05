const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
dotenv.config();
const fs = require('fs');
const csv = require('csv-parser');
const data = []; // Initialize the data array

app.use('/api/v1/user', require('./routes/userRoutes'));

connectDB();

const port = process.env.PORT || 8000;

fs.createReadStream('^NSEI.csv')
  .pipe(csv())
  .on('data', (row) => {
    data.push(row);
  })
  .on('end', () => {
    console.log('CSV file loaded.');
  });

app.get('/nifty50', (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on ${port}`.bgCyan.white);
});
