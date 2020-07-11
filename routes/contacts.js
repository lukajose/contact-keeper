const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Contact = require('../models/Contact');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');


// @ route PUT api/contacts/
// @desc Get all user contacts (specific user)
// @ access Public
router.get('/',auth, async (req,res)=>{
    try {
        const contacts = await Contact.find({user:req.user.id}).sort({date:-1});
        res.json(contacts);

    } catch(e) {
        console.error(e.message);
        res.status(500).send('server error');
    }
});




// @ route POST api/contacts
// @desc Add a new contact
// @ access Private
router.post('/',[auth,
    [
        check('name','name is required')
        .not()
        .isEmpty()
    ]

], async(req,res)=>{
    const {name,email,phone,type} = req.body;
    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user:req.user.id
        })
        const contact = await newContact.save();

        res.json(contact)
    } catch(e) {
        console.error('oh no shit:',e.message);
        res.status(500).send('Server error');
    }
});


// @ route PUT api/contacts/:id
// @desc Update contact
// @ access Private
router.put('/:id',auth,async (req,res)=>{
    
    const {name,email,phone,type} = req.body;
    
    // build contact object
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({msg:'contact not found!'});
        // make sure user owns a contact
        if(contact.user.toString() !== req.user.id)return res.status(401).json({msg:'Not authorized'});
        contact = await Contact.findByIdAndUpdate(req.params.id,
            {$set:contactFields},
            {new:true});
        res.json(contact);
    
    } catch(e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
    
});


// @ route DELETE api/contacts/:id
// @desc Delete contact
// @ access Private
router.delete('/:id',auth,async (req,res)=>{
    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({msg:'contact not found!'});
        // make sure user owns a contact
        if(contact.user.toString() !== req.user.id)return res.status(401).json({msg:'Not authorized'});
        await Contact.findByIdAndRemove(req.params.id);
        res.json({msg:'Contact'});
    
    } catch(e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});




module.exports = router;