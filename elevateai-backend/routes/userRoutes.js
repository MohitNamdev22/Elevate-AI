const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/addUser', UserController.addUser);
router.get('/user/:id', UserController.getUserById);
router.put('/user/:id', UserController.updateUser);

module.exports = router;