const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');
const authenticator = require('../middwares/authenticator');

router.get('/login', usersController.login);

router.get('/logout', usersController.logout);

router.get('/home', authenticator.isAuthenticated, usersController.index);

router.get('/get_all', authenticator.isAuthenticated, usersController.getAll);

router.get('/show/create', authenticator.isAuthenticated, authenticator.isadmin, usersController.showCreate);

router.get('/create', authenticator.isAuthenticated, usersController.create);

module.exports = router;