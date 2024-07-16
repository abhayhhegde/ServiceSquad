const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "app_user", // Your QL username
  password: "root", // Your MySQL password
  database: "service_provider_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the MySQL database.");
    db.query(
      `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        }
      }
    );
  }
});

// Routes
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  db.query(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    [username, password],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: result.insertId });
    }
  );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query(
    `SELECT * FROM users WHERE username = ? AND password = ?`,
    [username, password],
    (err, results) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      if (results.length > 0) {
        res.json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
