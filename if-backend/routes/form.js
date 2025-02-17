const express = require('express');
const Form = require('../models/Form');
const Router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const JWT_secret = "I@am$@esKApe"
const fetchuser = require('../middleware/fetchuser')
const fetchcompany = require('../middleware/fetchcompany')
const Company = require('../models/Company');
const User = require('../models/User');

Router.post(
  '/fillForm',
  [//Validation of email and password and all
    body('email').isEmail().withMessage('Not a valid e-mail address'),
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('phone').notEmpty().withMessage('Phone No. is required'),
    body('company').notEmpty().withMessage('Company is required'),
    body('role').notEmpty().withMessage('Internship Role is required'),
    body('resume').notEmpty().withMessage('Resume is required'),
    
  ],
  async (req, res) => {
    
    success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return validation errors
      return res.status(400).json({success, errors: errors.array() });
    }

  
      // Create a New Application
      
     try{
         const form = await Form.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        company: req.body.company,
        role: req.body.role,
        resume: req.body.resume,
        year: req.body.year,
        roll: req.body.roll,
        branch: req.body.branch,
        
      })


      await form.save();
      success=true;
      res.json({success,message:"Application submitted Successfully"});
     }

    catch (err) {
      console.error(err.message);
      res.status(500).json({success, error: 'Server error, please try again later.' });
    }
  }
);


Router.get('/getAllFilledForms', fetchuser, async (req, res) => {
  try {
      const userId = req.user.id; // Extracting email from fetchuser middleware
      const user = await User.findById(userId).select("email");
     
      if (!user.email) {
          return res.status(400).send('Email not found');
      }
      const forms = await Form.find({ email:user.email});
      res.json(forms);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
  }
});



Router.get('/getAllForms', fetchcompany, async (req, res) => {
  try {
      const companyId = req.company.id; // get company id from token
      
      // fetch company details using the companyId
      const company = await Company.findById(companyId).select("name");
      if (!company) {
          return res.status(404).json({ error: "company not found" });
      }
      
      const companyName = company.name; // get company name from db
      
      // find forms that match the company name
      const forms = await Form.find({ company: companyName });

      res.json(forms);
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "internal server error" });
  }
});





module.exports = Router;