const express = require('express');
const router = express.Router();
const menController = require('../controllers/menController');
const authenticateAdmin = require('../middlewares/authenticateAdmin');

router.post('/', authenticateAdmin, menController.createMen);
router.get('/', authenticateAdmin, menController.getMen);
router.get('/:id', authenticateAdmin, menController.getMenById);
router.put('/:id', authenticateAdmin, menController.updateMen);
router.delete('/:id', authenticateAdmin, menController.deleteMen);

module.exports = router;