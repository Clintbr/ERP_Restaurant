const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const { verifyToken, isManagerOrAdmin } = require('../middleware/authMiddleware');

router.use(verifyToken);
router.get('/', productsController.getAllProducts);
router.post('/', isManagerOrAdmin, productsController.createProduct);
router.put('/:id', isManagerOrAdmin, productsController.updateProduct);
router.delete('/:id', isManagerOrAdmin, productsController.deleteProduct);

module.exports = router;
