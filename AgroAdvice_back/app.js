require('dotenv').config();
const express = require('express');

//Les routes
const authRoutes = require('./routes/auth_routes');
const botRoutes = require('./routes/bot_routes');
const ttsRoutes = require('./routes/tts_routes');

const app = express();

//Autorisations cors
//midleware general qui s'applique à toutes les routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//middleware globaux
app.use(express.json());

app.use('/api/bot', botRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/voice', ttsRoutes);

module.exports = app;