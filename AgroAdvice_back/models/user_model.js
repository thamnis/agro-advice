const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Nom complet requis!'],
            trim: true,
            minLength: [5, '5 caractères minimum']
            

        },
        email: {
            type: String,
            required: [true, 'Adresse email requise!'],
            trim: true,
            unique: [true, `L'adresse email doit etre unique!`],
            minLength: [5, '5 caractères minimum'],
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, 'Mot de passe requis!'],
            trim: true,
            select: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);