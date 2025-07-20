const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Connexion à MongoDB
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
    
})
.catch((err) => {
  console.error('Impossible de se connecter à MongoDB: ', err);
});
