const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const authenticateToken = require('../middlewares/authToken');
const cacheMiddleware = require('../middlewares/cachingMiddleware');


router.get('/getwishlist', authenticateToken, cacheMiddleware, getWishlist);
router.post('/addtowishlist', authenticateToken, cacheMiddleware, addToWishlist);
router.delete('/removefromwishlist', authenticateToken, cacheMiddleware, removeFromWishlist);

module.exports = router;