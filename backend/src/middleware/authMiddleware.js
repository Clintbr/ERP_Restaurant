const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided.' });

    const tokenBearer = token.split(' ')[1] || token;

    jwt.verify(tokenBearer, process.env.JWT_SECRET || 'supersecretkey_change_in_production', (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Failed to authenticate token.' });
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.userRole !== 'Administrateur') {
        return res.status(403).json({ message: 'Require Admin Role!' });
    }
    next();
};

const isManagerOrAdmin = (req, res, next) => {
    if (req.userRole !== 'Administrateur' && req.userRole !== 'Manager') {
        return res.status(403).json({ message: 'Require Admin or Manager Role!' });
    }
    next();
};

module.exports = { verifyToken, isAdmin, isManagerOrAdmin };
