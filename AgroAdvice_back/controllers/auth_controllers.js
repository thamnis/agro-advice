const {signupSchema} = require('../middlewares/validator_middleware');
const {loginSchema} = require('../middlewares/validator_middleware');
const { doHash, doComparation } = require('../utils/ashing');
const jwt = require('jsonwebtoken');


//Import du model
const User = require('../models/user_model');

//Implementation des fonctions de controle

//Inscrpiption
exports.signup = async (req, res) =>{
    const {fullName, email, password} = req.body;
    try {
        const{error, value} = signupSchema.validate({fullName, email, password}); 

        if(error){
            return res.status(401).json({success:false, message: error.details[0].message});
        }

        const normalizedEmail = email.toLowerCase();

        const existingUser = await User.findOne({email: normalizedEmail});

        if(existingUser){
            return res.status(401).json({success:false, message:"Cette adresse email est déjà utilisée!"});
        }
        
        const hashedPassword = await doHash(password, 10);
        const newUser = new User({
            fullName,
            email: normalizedEmail,
            password: hashedPassword
        });
        const result = await newUser.save();
        result.password = undefined;
        res.status(201).json({success:true, message:"Inscription réussie!"});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Une erreur est survenue lors de l'inscription." });
    }
}

//Connexion
exports.login = async (req, res) =>{
    const {email, password} = req.body;

    try {
        const{error, value} = loginSchema.validate({email, password}); 

        if(error){
            return res.status(401).json({success:false, message: error.details[0].message});
        }

        const normalizedEmail = email.toLowerCase();

        const existingUser = await User.findOne({email: normalizedEmail}).select('+password');

        if(!existingUser){
            return res.status(401).json({success:false, message:"Identifiants de connexion incorrects!"});
        }
        
        const verifyHash = await doComparation(password, existingUser.password);

        if(!verifyHash){
            return res.status(401).json({success:false, message:"Identifiants de connexion incorrects!"});
        }

        const token = jwt.sign({
            userId: existingUser._id,
            userFullName: existingUser.fullName,
            email: existingUser.email
        }, process.env.TOKEN_SECRET, { expiresIn: '8h' });

        res.status(200).json({
            success: true,
            token,
            message: "Connexion réussie"
        });

    }catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Une erreur est survenue lors de la connexion." });
    }
}

//Verification utilisateur connecté
exports.verify = (req, res) => {
    res.status(200).json({
        success: true,
        userId: req.auth.userId,
        userFullName: req.auth.userFullName,
        userEmail: req.auth.email
    });
};

