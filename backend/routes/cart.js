const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');
const fetchUser = require('../middlewares/fetchUser');

router.post('/addtocart', fetchUser, addToCart);
router.post('/removefromCart', fetchUser, removeFromCart);
router.get('/getcart', fetchUser, getCart);

module.exports = router;
