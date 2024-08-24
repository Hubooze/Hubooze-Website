const express = require('express');
const {
    getAllProducts,
    getProductsByCategory,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const authenticateAdmin = require('../middlewares/authenticateAdmin');
const cacheMiddleware = require('../middlewares/cachingMiddleware')

const router = express.Router();

// Route for getting all products with optional filters, sorting, and pagination
router.get('/', cacheMiddleware, getAllProducts);

router.get('/category/:category', cacheMiddleware, getProductsByCategory);

// Route for getting a single product by ID
router.get('/:id', cacheMiddleware, getProductById);

// Route for creating a new product
router.post('/', authenticateAdmin, createProduct);

// Route for updating an existing product
router.put('/:id', authenticateAdmin, updateProduct);

// Route for deleting a product
router.delete('/:id', authenticateAdmin, deleteProduct);

module.exports = router;
