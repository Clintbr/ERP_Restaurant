const db = require('./src/config/db');
const bcrypt = require('bcrypt');

db.get('SELECT * FROM users WHERE username = ?', ['admin'], (err, user) => {
    if (err) {
        console.error('DB Error:', err);
        return;
    }
    if (!user) {
        console.log('User not found!');
        return;
    }
    console.log('Found user:', user);
    const isValid = bcrypt.compareSync('admin123', user.password_hash);
    console.log('Password valid:', isValid);
});
