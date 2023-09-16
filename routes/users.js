const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');
const authenticator = require('../middwares/authenticator');

router.get('/login', usersController.login);

router.get('/logout', usersController.logout);

router.get('/home', authenticator.isAuthenticated, usersController.index);

router.get('/show/create', authenticator.isAuthenticated, authenticator.isadmin, usersController.showCreate);

router.get('/create', authenticator.isAuthenticated, authenticator.isadmin, usersController.create);

router.get('/show/update/:id', authenticator.isAuthenticated, authenticator.isadmin, usersController.showUpdate);

router.get('/update', authenticator.isAuthenticated, authenticator.isadmin, usersController.update);

router.get('/delete/:id', authenticator.isAuthenticated, authenticator.isadmin, usersController.deleteUser);

module.exports = router;