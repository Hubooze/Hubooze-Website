const express = require('express');
const router = express.Router();
const { signup, login, userInfo } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authMiddleware, userInfo);

module.exports = router;
