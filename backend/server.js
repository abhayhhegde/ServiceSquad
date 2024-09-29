const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "service_provider_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the MySQL database.");

    // Ensure necessary tables exist
    db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(255) NOT NULL
      )`, (err) => {
      if (err) {
        console.error("Error creating users table:", err.message);
      }
    });

    const services = ['electrician', 'carpenter', 'plumber', 'janitor', 'mason', 'gardener', 'mechanic', 'painter'];

    services.forEach(service => {
      db.query(`
        CREATE TABLE IF NOT EXISTS ${service} (
          id INT AUTO_INCREMENT PRIMARY KEY,
          service VARCHAR(255) NOT NULL,
          experience INT NOT NULL,
          address VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          image BLOB
        )`, (err) => {
        if (err) {
          console.error(`Error creating ${service} table:`, err.message);
        }
      });
    });
  }
});

// Register a new user
app.post("/register", (req, res) => {
  const { username, password, email, phone } = req.body;
  db.query(
    `INSERT INTO users (username, password, email, phone) VALUES (?, ?, ?, ?)`,
    [username, password, email, phone],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: result.insertId });
    }
  );
});

// User login
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

// Endpoint to check if email exists and retrieve user details
app.get("/check-email/:email", (req, res) => {
  const { email } = req.params;

  db.query(
    `SELECT username, phone FROM users WHERE email = ?`,
    [email],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: "Email not found" });
      }
    }
  );
});

// Endpoint to handle service provider registration with image upload
app.post("/become-service-provider", upload.single('image'), (req, res) => {
  const { service, experience, address, email } = req.body;
  const image = req.file ? req.file.buffer : null;

  if (!service || !experience || !address || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  let tableName = '';

  switch (service.toLowerCase()) {
    case 'electrician':
    case 'carpenter':
    case 'plumber':
    case 'janitor':
    case 'mason':
    case 'gardener':
    case 'mechanic':
    case 'painter':
      tableName = `${service.toLowerCase()}`;
      break;
    default:
      return res.status(400).json({ error: 'Invalid service selected' });
  }

  db.query(
    `INSERT INTO ${tableName} (service, experience, address, email, image) VALUES (?, ?, ?, ?, ?)`,
    [service, experience, address, email, image],
    (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(201).json({ message: "Service provider registered successfully" });
    }
  );
});

// Endpoint to retrieve service provider details based on email
app.get("/service-provider/:service/:email", (req, res) => {
  const { service, email } = req.params;

  let tableName = '';

  switch (service.toLowerCase()) {
    case 'electrician':
    case 'plumber':
    case 'mason':
    case 'carpenter':
    case 'gardener':
    case 'painter':
    case 'mechanic':
      tableName = `${service.toLowerCase()}`;
      break;
    default:
      return res.status(400).json({ error: 'Invalid service selected' });
  }

  db.query(`
    SELECT service, experience, address, email, image
    FROM ${tableName}
    WHERE email = ?
  `, [email], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length > 0) {
      const provider = results[0];
      provider.image = provider.image ? provider.image.toString('base64') : null;
      res.json(provider);
    } else {
      res.status(404).json({ message: "No provider found" });
    }
  });
});

// Endpoint to retrieve all service providers for a specific service
app.get("/service-providers/:service", (req, res) => {
  const { service } = req.params;

  let tableName = '';

  switch (service.toLowerCase()) {
    case 'electrician':
    case 'plumber':
    case 'mason':
    case 'carpenter':
    case 'gardener':
    case 'painter':
      tableName = `${service.toLowerCase()}`;
      break;
    default:
      return res.status(400).json({ error: 'Invalid service selected' });
  }

  db.query(`
    SELECT service, experience, address, email, image
    FROM ${tableName}
  `, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const providers = results.map(provider => ({
      ...provider,
      image: provider.image ? provider.image.toString('base64') : null,
    }));
    res.json(providers);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
