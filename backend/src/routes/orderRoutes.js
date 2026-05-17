const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const { verifyToken } = require('../middleware/authMiddleware');

router.use(verifyToken);
router.get('/', ordersController.getAllOrders);
router.post('/', ordersController.createOrder); // Cashier/Server
router.put('/:id/status', ordersController.updateOrderStatus); // Kitchen/Server
router.post('/:id/items', ordersController.addOrderItems); // Server adding items

module.exports = router;
