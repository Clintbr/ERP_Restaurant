const express = require('express');
const router = express.Router();
const tablesController = require('../controllers/tablesController');
const { verifyToken, isManagerOrAdmin } = require('../middleware/authMiddleware');

router.use(verifyToken);
router.get('/', tablesController.getAllTables);
router.post('/', isManagerOrAdmin, tablesController.createTable);
router.put('/:id/status', tablesController.updateTableStatus); // servers can update table status

module.exports = router;
