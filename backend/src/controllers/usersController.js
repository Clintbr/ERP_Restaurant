const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.getAllUsers = (req, res) => {
    db.all('SELECT id, username, role, is_active, created_at FROM users', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.createUser = (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password are required' });

    const password_hash = bcrypt.hashSync(password, 10);
    const userRole = role || 'Serveur';

    db.run(
        'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)',
        [username, password_hash, userRole],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID, username, role: userRole });
        }
    );
};

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { username, role, is_active, password } = req.body;

    // Ideally, update dynamically based on provided fields
    let query = 'UPDATE users SET ';
    let params = [];
    
    if (username) { query += 'username = ?, '; params.push(username); }
    if (role) { query += 'role = ?, '; params.push(role); }
    if (is_active !== undefined) { query += 'is_active = ?, '; params.push(is_active ? 1 : 0); }
    if (password) { query += 'password_hash = ?, '; params.push(bcrypt.hashSync(password, 10)); }
    
    query = query.slice(0, -2); // remove last comma and space
    query += ' WHERE id = ?';
    params.push(id);

    db.run(query, params, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ updatedID: id, changes: this.changes });
    });
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deletedID: id, changes: this.changes });
    });
};
