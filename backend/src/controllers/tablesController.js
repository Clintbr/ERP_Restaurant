const db = require('../config/db');

exports.getAllTables = (req, res) => {
    db.all('SELECT * FROM tables', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.createTable = (req, res) => {
    const { table_number, capacity, zone } = req.body;
    db.run(
        'INSERT INTO tables (table_number, capacity, status, zone) VALUES (?, ?, ?, ?)',
        [table_number, capacity || 2, 'Libre', zone],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID, table_number, capacity, status: 'Libre', zone });
        }
    );
};

exports.updateTableStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.run(
        'UPDATE tables SET status = ? WHERE id = ?',
        [status, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updatedID: id, status });
        }
    );
};
