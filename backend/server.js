const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON data
app.use(express.urlencoded({ extended: true })); // For parsing form data

// Serve static files
app.use(express.static(path.join(__dirname, '../')));

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3308, // Specify the correct MySQL port
  user: 'newuser', // Use your new MySQL user
  password: '', // Replace with the actual password
  database: 'db_chicken_store' // Replace with your database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('✅ Connected to the database!');
});

// Sample Route (Test if the server is running)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/sales.html'));
});

// Example Route (Get all data from a table)
app.get('/data', (req, res) => {
  connection.query('SELECT * FROM sales', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Database error');
      return;
    }
    res.json(results);
  });
});

// Submit Sale Route
app.post('/submit-sale', (req, res) => {
  console.log("Received sales data:", req.body); // Debugging line

  const { sales } = req.body; // Expecting an array of sales data

  if (!sales || sales.length === 0) {
      return res.status(400).json({ message: "No sales data received." });
  }

  const sql = "INSERT INTO sales (name, category, unit_price, quantity, total_price) VALUES ?";
  const values = sales.map(sale => [
      sale.name,
      sale.category,
      sale.unitPrice,
      sale.quantity,
      sale.totalPrice
  ]);

  connection.query(sql, [values], (error, results) => {
    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ message: "Database error.", error: error.message });
    }
    res.json({ message: "Sales recorded successfully." });
  });
});

// Update Sale Route
app.put('/update-sale/:id', (req, res) => {
  const { id } = req.params;
  const { name, category, unit_price, quantity, total_price } = req.body;

  const sql = "UPDATE sales SET name = ?, category = ?, unit_price = ?, quantity = ?, total_price = ? WHERE id = ?";
  connection.query(sql, [name, category, unit_price, quantity, total_price, id], (error, results) => {
    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ message: "Database error.", error: error.message });
    }
    res.json({ message: "Sale updated successfully." });
  });
});

// Delete Sale Route
app.delete('/delete-sale/:id', (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM sales WHERE id = ?";
  connection.query(sql, [id], (error, results) => {
    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ message: "Database error.", error: error.message });
    }
    res.json({ message: "Sale deleted successfully." });
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

app.get('/favicon.ico', (req, res) => res.status(204));