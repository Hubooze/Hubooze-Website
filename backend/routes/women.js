const express = require('express');
const router = express.Router();
const womenController = require('../controllers/womenController');
const authenticateAdmin = require('../middlewares/authenticateAdmin');

router.post('/', authenticateAdmin, womenController.createWomen);
router.get('/', authenticateAdmin, womenController.getWomen);
router.get('/:id', authenticateAdmin, womenController.getWomenById);
router.put('/:id', authenticateAdmin, womenController.updateWomen);
router.delete('/:id', authenticateAdmin, womenController.deleteWomen);

module.exports = router;