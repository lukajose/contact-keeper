const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const User = require('../models/User');
// @ route POST api/auth
// @desc Register a user
// @ access Private
router.get('/',auth, async (req,res)=>{
    try {

        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
        console.log('All good token')

    } catch(e) {
        console.log(e.message);
        res.status(500).send('Server error!');
    }

});


// @ route POST api/auth
// @desc Auth user and get the token
// @ access Public
router.post('/',[
    check('email','please include a valid email'),
    check('password','password is required').exists()
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});

    const {email,password} = req.body;
    console.log('Login starts')
    try {
        let user = await User.findOne({email});
        // no user found
        if(!user) return res.status(400).json({msg:"Invalid Credentials"});
        // check if match 
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) res.status(400).json({msg:"Invalid Credentials"});
        // send the token
        const payload = {
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,config.get("secret"),{expiresIn:360000},(err,token)=>{
            if(err) throw err;
            res.json({token})
        })

    } catch(e) {
        console.error('something weird happened in back:',e.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;