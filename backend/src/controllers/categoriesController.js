const db = require('../config/db');

exports.getAllCategories = (req, res) => {
    db.all('SELECT * FROM categories', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.createCategory = (req, res) => {
    const { name, description } = req.body;
    db.run(
        'INSERT INTO categories (name, description) VALUES (?, ?)',
        [name, description],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID, name, description });
        }
    );
};
