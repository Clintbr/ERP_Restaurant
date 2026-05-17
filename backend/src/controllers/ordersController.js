const db = require('../config/db');

exports.getAllOrders = (req, res) => {
    const { status } = req.query; // filter by status if provided
    let query = 'SELECT * FROM orders';
    let params = [];
    if (status) {
        query += ' WHERE status = ?';
        params.push(status);
    }
    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.createOrder = (req, res) => {
    const { table_id, user_id } = req.body;
    db.run(
        'INSERT INTO orders (table_id, user_id, status, total_amount) VALUES (?, ?, ?, ?)',
        [table_id, user_id, 'Nouvelle', 0],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            
            // Also update table status to 'Occupée'
            db.run('UPDATE tables SET status = ? WHERE id = ?', ['Occupée', table_id]);

            res.status(201).json({ id: this.lastID, table_id, user_id, status: 'Nouvelle' });
        }
    );
};

exports.updateOrderStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.run(
        'UPDATE orders SET status = ? WHERE id = ?',
        [status, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updatedID: id, status });
        }
    );
};

exports.addOrderItems = (req, res) => {
    const { id } = req.params;
    const { items } = req.body; // Array of { product_id, quantity, unit_price }
    if (!items || !items.length) return res.status(400).json({ message: 'No items provided' });

    db.serialize(() => {
        const stmt = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, unit_price, status) VALUES (?, ?, ?, ?, ?)');
        let addedTotal = 0;
        
        items.forEach(item => {
            stmt.run(id, item.product_id, item.quantity, item.unit_price, 'En attente');
            addedTotal += (item.quantity * item.unit_price);
        });
        stmt.finalize();

        // Update total_amount in orders
        db.run('UPDATE orders SET total_amount = total_amount + ? WHERE id = ?', [addedTotal, id], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Items added successfully', order_id: id, addedAmount: addedTotal });
        });
    });
};
