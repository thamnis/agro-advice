const express = require('express');
const router = express.Router();
//Import des middleware
//Import des controllers
const ttsControllers = require('../controllers/tts_controllers');


router.post('/speak',  ttsControllers.speak);


module.exports = router;