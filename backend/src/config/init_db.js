const fs = require('fs');
const path = require('path');
const db = require('./db');

const schemaPath = path.resolve(__dirname, 'schema.sql');

const initDB = () => {
  const schema = fs.readFileSync(schemaPath, 'utf8');

  db.exec(schema, (err) => {
    if (err) {
      console.error('Error executing schema:', err.message);
    } else {
      console.log('Database successfully initialized with schema.');
      
      // Optionally create a default admin user
      const bcrypt = require('bcrypt');
      db.get("SELECT * FROM users WHERE username = ?", ["admin"], (err, row) => {
        if (!row) {
          const hash = bcrypt.hashSync("admin123", 10);
          db.run(
            "INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)",
            ["admin", hash, "Administrateur"],
            (err) => {
              if (err) console.error("Error creating default admin:", err.message);
              else console.log("Default admin user created (admin / admin123).");
            }
          );
        }
      });
    }
  });
};

initDB();
