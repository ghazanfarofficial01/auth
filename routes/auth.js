const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authRouter = express.Router();
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox9f85235fa5d74960bed2de0115c9141d.mailgun.org';
const api_key = process.env.mailgunKey
const mg = mailgun({apiKey: api_key, domain: DOMAIN});
//mail verify route
authRouter.get('/confirmation/:token',async(req,res) =>{
  try{
     const id = jwt.verify(req.params.token,'mysecret');
     const user = await User.findByIdAndUpdate(id,{emailVerified:true});
     res.send(user);
  } catch(e){
    res.send('error');
  }
})


//SIGNUP THROUGH EMAIL AND PASSWORD ROUTE
authRouter.post("/api/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ msg: "User with same email already exists!" });
      }
  
      const hashedPassword = await bcryptjs.hash(password, 8);
  
      let user = new User({
        email,
        password:hashedPassword,
        name
      });
      user = await user.save();
      
      
      const id = user._id.valueOf();
      

      
      //send verification mail to user
      jwt.sign(id , 'mysecret', function(err, token) {
        const url = `http://localhost:3000/confirmation/${token}`
        const data = {
          from: 'no-reply@biscuit',
          to: email,
          subject: 'Email Verification',
          html: `<h2>Kindly verify your email to proceed further on biscuit app.</h2>
                 <a href = "${url}">click here to verify</a>`
      };
      mg.messages().send(data, function (error, body) {
          console.log("Mail sent");
      });
      });

      
      
      res.json(user);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });



//SIGIN ROUTE
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password." });
    }
    
    if(!user.emailVerified){
      return res.status(400).json({ msg: "Please verify your email" });
    }

    const token = jwt.sign({ id: user._id }, "mysecret");
    
    res.json({ token, ...user._doc }); 
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


module.exports = authRouter;
