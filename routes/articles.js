const express = require("express");
const router = express.Router();
const articleController = require('../controllers/articleController');
const authenticator = require('../middwares/authenticator');

router.get('/show/create', authenticator.isAuthenticated, articleController.showCreate);

router.get('/create', authenticator.isAuthenticated, articleController.create);

router.get('/show/update/:id', authenticator.isAuthenticated, articleController.showUpdate);

router.get('/update', authenticator.isAuthenticated, articleController.update);

router.get('/delete/:id', authenticator.isAuthenticated, articleController.deleteArticle);



module.exports = router;