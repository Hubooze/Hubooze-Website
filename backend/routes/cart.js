const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');
const authenticateToken = require('../middlewares/authToken');
const cacheMiddleware = require('../middlewares/cachingMiddleware');

router.post('/addtocart', authenticateToken, cacheMiddleware, addToCart);
router.post('/removefromcart', authenticateToken, cacheMiddleware, removeFromCart);
router.get('/getcart', authenticateToken, cacheMiddleware, getCart);

module.exports = router;
