const express = require('express');
const router = express.Router();

//Import des middleware
const {authenticateUser} = require('../middlewares/auth_middleware');

//Import des controllers
const authControllers = require('../controllers/auth_controllers');

//Implementation des routes
router.post('/signup', authControllers.signup);
router.post('/login', authControllers.login);
router.get('/verify', authenticateUser, authControllers.verify );

module.exports = router;