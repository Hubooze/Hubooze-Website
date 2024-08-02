const express = require('express');
const router = express.Router();
const kidsController = require('../controllers/kidsController');
const authenticateAdmin = require('../middlewares/authenticateAdmin');

router.post('/', authenticateAdmin, kidsController.createKids);
router.get('/', authenticateAdmin, kidsController.getKids);
router.get('/:id', authenticateAdmin, kidsController.getKidsById);
router.put('/:id', authenticateAdmin, kidsController.updateKids);
router.delete('/:id', authenticateAdmin, kidsController.deleteKids);

module.exports = router;