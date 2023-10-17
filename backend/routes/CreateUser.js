const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "mynameissiddharthtamboliandiamfromchittorgarhindia";

router.post('/createUser', 
    body('name').isLength({min : 3}),
    body('email',).isEmail(),
    body('password','password must be at least 8 character').isLength({min : 8}),

    async (req,res) => {

        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error : error.array()});
        }

    let salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);   

    try {
        User.create({
            // name : "sid",
            // password : "1234",
            // email : "sid@gmail.com",
            // location : "delhi"

            //input taken by body
            name : req.body.name,
            password : secPass,
            email : req.body.email,
            location : req.body.location
        })
        res.json({success : true});
    } catch (error) {
        console.log(error);
        res.json({success : false});
    }
});


router.post('/loginUser',
        body('email',).isEmail(),
        body('password','password must be at least 8 character').isLength({min : 8}),
    async (req,res) => {

        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({error : error.array()});
        }

    let email = req.body.email;
    try {
        let userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({error : "Please try to login with correct credentials"});
        }

        let pwdCompare = await bcrypt.compare(req.body.password, userData.password);
        if(!pwdCompare){
            return res.status(400).json({error : "Please try to login with correct credentials"});
        }

        const data = {
            user : {
                id : userData.id
            }
        }

        const authToken = jwt.sign(data, jwtSecret);


        return res.json({success : true , authToken : authToken});
    } catch (error) {
        console.log(error);
        res.json({success : false});
    }
});

module.exports = router;