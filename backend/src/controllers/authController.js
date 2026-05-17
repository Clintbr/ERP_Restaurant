const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        if (!user || user.is_active === 0) {
            return res.status(404).json({ message: 'User Not found or Inactive.' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password_hash);
        if (!passwordIsValid) {
            return res.status(401).json({ token: null, message: 'Invalid Password!' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role, username: user.username },
            process.env.JWT_SECRET || 'supersecretkey_change_in_production',
            { expiresIn: 86400 } // 24 hours
        );

        res.status(200).json({
            id: user.id,
            username: user.username,
            role: user.role,
            accessToken: token
        });
    });
};

exports.getMe = (req, res) => {
    db.get('SELECT id, username, role, is_active, created_at FROM users WHERE id = ?', [req.userId], (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        if (!user) {
            return res.status(404).json({ message: 'User Not found.' });
        }
        res.status(200).json(user);
    });
};

exports.forgotPassword = (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ message: 'Username is required' });

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const reset_token = crypto.randomBytes(20).toString('hex');
        const reset_expires = Date.now() + 3600000; // 1 hour elapsed

        db.run('UPDATE users SET reset_token = ?, reset_expires = ? WHERE id = ?', [reset_token, reset_expires, user.id], (err) => {
            if (err) return res.status(500).json({ message: 'Database error' });
            // In a real app, send an email here. For this ERP MVP, we'll return the token.
            res.json({ message: 'Password reset link generated', token: reset_token });
        });
    });
};

exports.resetPassword = (req, res) => {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ message: 'Token and new password required' });

    db.get('SELECT * FROM users WHERE reset_token = ? AND reset_expires > ?', [token, Date.now()], (err, user) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (!user) return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });

        const password_hash = bcrypt.hashSync(newPassword, 10);
        db.run('UPDATE users SET password_hash = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?', [password_hash, user.id], (err) => {
            if (err) return res.status(500).json({ message: 'Database error' });
            res.json({ message: 'Your password has been successfully reset.' });
        });
    });
};
