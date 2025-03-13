const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();
const jwt = require('jsonwebtoken');
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
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
        phone VARCHAR(255) NOT NULL,
        is_provider BOOLEAN DEFAULT FALSE
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

    db.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        provider_id VARCHAR(255) NOT NULL,
        service_type VARCHAR(100) NOT NULL,
        booking_date DATE NOT NULL,
        booking_time TIME NOT NULL,
        address TEXT NOT NULL,
        description TEXT,
        status ENUM('pending', 'accepted', 'completed', 'cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )`, (err) => {
      if (err) {
        console.error("Error creating bookings table:", err.message);
      } 
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

//user Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = result[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    try {
      const token = jwt.sign(
        { username: user.username, id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({ 
        message: "Login successful", 
        token, 
        username: user.username 
      });
    } catch (error) {
      console.error("JWT Error:", error);
      return res.status(500).json({ message: "Token generation failed" });
    }
  });
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

  db.beginTransaction((transactionErr) => {
    if (transactionErr) {
      return res.status(500).json({ error: "Transaction failed: " + transactionErr.message });
    }

    db.query(
      `INSERT INTO ${tableName} (service, experience, address, email, image) VALUES (?, ?, ?, ?, ?)`,
      [service, experience, address, email, image],
      (insertErr) => {
        if (insertErr) {
          return db.rollback(() => {
            res.status(400).json({ error: "Insertion failed: " + insertErr.message });
          });
        }

        db.query(
          `UPDATE users SET is_provider = true WHERE email = ?`,
          [email],
          (updateErr) => {
            if (updateErr) {
              return db.rollback(() => {
                res.status(400).json({ error: "Update failed: " + updateErr.message });
              });
            }

            db.commit((commitErr) => {
              if (commitErr) {
                return db.rollback(() => {
                  res.status(500).json({ error: "Commit failed: " + commitErr.message });
                });
              }

              res.status(201).json({ message: "Service provider registered successfully" });
            });
          }
        );
      }
    );
  });
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


// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Check if user is a service provider
app.get("/check-provider-status", verifyToken, (req, res) => {
  const userId = req.user.id;
  
  // First check users table for is_provider flag
  db.query(
    `SELECT is_provider FROM users WHERE id = ?`,
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      if (results.length > 0 && results[0].is_provider) {
        return res.json({ isProvider: true });
      }
      
      // If not marked in users table, check all service tables
      const services = ['electrician', 'carpenter', 'plumber', 'janitor', 'mason', 'gardener', 'mechanic', 'painter'];
      const userEmail = req.user.email || '';
      
      // If we don't have the email in the token, query for it
      if (!userEmail) {
        db.query(
          `SELECT email FROM users WHERE id = ?`,
          [userId],
          (err, results) => {
            if (err || results.length === 0) {
              return res.json({ isProvider: false });
            }
            checkServiceTables(results[0].email);
          }
        );
      } else {
        checkServiceTables(userEmail);
      }
      
      function checkServiceTables(email) {
        let queriesCompleted = 0;
        let isProvider = false;
        
        services.forEach(service => {
          db.query(
            `SELECT COUNT(*) as count FROM ${service} WHERE email = ?`,
            [email],
            (err, results) => {
              queriesCompleted++;
              
              if (!err && results[0].count > 0) {
                isProvider = true;
              }
              
              if (queriesCompleted === services.length) {
                // If found as provider, update user record
                if (isProvider) {
                  db.query(
                    `UPDATE users SET is_provider = TRUE WHERE id = ?`,
                    [userId]
                  );
                }
                
                res.json({ isProvider });
              }
            }
          );
        });
      }
    }
  );
});

// Create a new booking
app.post("/bookings", verifyToken, (req, res) => {
  const { provider_id, service_type, booking_date, booking_time, address, description } = req.body;
  const user_id = req.user.id; 
  const decodedProviderId = decodeURIComponent(provider_id);
  if (!decodedProviderId || !service_type || !booking_date || !booking_time || !address) {
    return res.status(400).json({ error: "All required fields must be provided" });
  }
  db.query(
    `INSERT INTO bookings (user_id, provider_id, service_type, booking_date, booking_time, address, description) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [user_id, decodedProviderId, service_type, booking_date, booking_time, address, description],
    (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Database error. Please try again later." });
      }
      res.status(201).json({ id: result.insertId, message: "Booking created successfully" });
    }
  );
});

// Get user's bookings
app.get("/user/bookings", verifyToken, (req, res) => {
  const user_id = req.user.id;

  db.query(
    `SELECT b.*, u.username as provider_name 
     FROM bookings b
     JOIN users u ON b.provider_id = u.email
     WHERE b.user_id = ?
     ORDER BY b.booking_date DESC, b.booking_time DESC`,
    [user_id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    }
  );
});

// Get provider's service requests
app.get("/provider/bookings", verifyToken, (req, res) => {
  const provider_id = req.user.id; // This is a numeric ID

  // Fetch the provider's email from the `users` table
  db.query(`SELECT email FROM users WHERE id = ?`, [provider_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: "Provider not found" });
    }

    const provider_email = results[0].email; // Now we have the email

    db.query(
      `SELECT b.*, u.username AS client_name, u.phone AS client_phone
       FROM bookings b
       JOIN users u ON b.user_id = u.id
       WHERE b.provider_id = ? 
       ORDER BY STR_TO_DATE(b.booking_date, '%Y-%m-%d') DESC, b.booking_time DESC`,
      [provider_email],  // Use the fetched email here
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json(results);
      }
    );
  });
});

// Update booking status
app.put("/bookings/:id/status", verifyToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const user_id = req.user.id;

  // Validate status value
  if (!['pending', 'accepted', 'completed', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  // Fetch provider email from `users` table
  db.query(`SELECT email FROM users WHERE id = ?`, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(403).json({ error: "User not found" });
    }

    const provider_email = results[0].email;

    // Check if user is either the booking client or provider
    db.query(
      `SELECT * FROM bookings WHERE id = ? AND (user_id = ? OR provider_id = ?)`,
      [id, user_id, provider_email], // Compare provider_email instead of user_id
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
          return res.status(403).json({ error: "You are not authorized to update this booking" });
        }

        // Update booking status
        db.query(
          `UPDATE bookings SET status = ? WHERE id = ?`,
          [status, id],
          (err) => {
            if (err) {
              return res.status(400).json({ error: err.message });
            }
            res.json({ message: "Booking status updated successfully" });
          }
        );
      }
    );
  });
});


// Get provider details by ID for booking form
app.get("/providers/:email", (req, res) => {
  const { email } = req.params;
  const decodedEmail = decodeURIComponent(email);

  db.query(
    `SELECT id, username, email, phone FROM users WHERE email = ?`,
    [decodedEmail],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);  // Log error for debugging
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!results.length) {
        return res.status(404).json({ message: "Provider not found" });
      }

      res.json(results[0]);  // Send provider details
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
