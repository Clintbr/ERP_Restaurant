const db = require('../config/db');

exports.getAllProducts = (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.createProduct = (req, res) => {
    const { name, price, category_id, is_available } = req.body;
    db.run(
        'INSERT INTO products (name, price, category_id, is_available) VALUES (?, ?, ?, ?)',
        [name, price, category_id, is_available !== undefined ? is_available : 1],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID, name, price, category_id, is_available });
        }
    );
};

exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price, category_id, is_available } = req.body;
    db.run(
        'UPDATE products SET name = COALESCE(?, name), price = COALESCE(?, price), category_id = COALESCE(?, category_id), is_available = COALESCE(?, is_available) WHERE id = ?',
        [name, price, category_id, is_available, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updatedID: id, changes: this.changes });
        }
    );
};

exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM products WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deletedID: id, changes: this.changes });
    });
};
