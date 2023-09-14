const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');
const authenticator = require('../middwares/authenticator');

router.get('/home', authenticator.isAuthenticated, usersController.index);

router.get('/get_all', usersController.getAll);

router.get('/login', usersController.login);

module.exports = router;