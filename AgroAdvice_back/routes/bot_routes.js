const express = require('express');
const router = express.Router();
//Import des middleware
const {authenticateUser} = require('../middlewares/auth_middleware');
//Import des controllers
const botControllers = require('../controllers/bot_controllers');


router.post('/userPrompt',authenticateUser, botControllers.prompt);


module.exports = router;