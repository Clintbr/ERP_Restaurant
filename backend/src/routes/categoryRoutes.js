const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const { verifyToken, isManagerOrAdmin } = require('../middleware/authMiddleware');

router.use(verifyToken);
router.get('/', categoriesController.getAllCategories);
router.post('/', isManagerOrAdmin, categoriesController.createCategory);

module.exports = router;
