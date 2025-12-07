const express = require('express');
const favController = require('../controllers/favouriteController');
const { protectUser } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // <-- new

const router = express.Router();

router.get('/', protectUser, favController.showMainPage);

router.get('/:category', protectUser, favController.showCategory);
router.get('/:category/add', protectUser, favController.showAddPage);

// Use upload.single('posterFile') to parse the file into req.file
router.post('/:category/add', protectUser, upload.single('posterFile'), favController.addItem);

// Delete item route:
router.post('/:category/delete/:id',protectUser,favController.postDeleteItem)

module.exports = router;
