const express = require('express');
const path = require('path');
const salesRoutes = require('./routes/salesRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, '../')));

// Routes
app.use('/sales', salesRoutes);

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Sales route to serve sales.html
app.get('/sales', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/sales.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});