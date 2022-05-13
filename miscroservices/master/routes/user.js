const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
    
        if (!(email && password && first_name && last_name)) {
          res.status(400).send("All input is required");
        }
    
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        var u='',m='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',i=0,rb=Math.random()*0xffffffff|0;
        while(i++<36) {
            var c=m[i-1],r=rb&0xf,v=c=='x'?r:(r&0x3|0x8);
            u+=(c=='-'||c=='4')?c:v.toString(16);rb=i%8==0?Math.random()*0xffffffff|0:rb>>4
        }
        console.log(u);
        encryptedPassword = await bcrypt.hash(password, 10);
    
        const user = await User.create({
          username: email.toLowerCase(),
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
          p_key: u
        });
    
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        user.token = token;
    
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
});

router.post("/login", async (req, res) => {
  
  
  // if(username == 'data.gov' && password == 'password'){
  //   res.status(200).send({token:'asbcSDsnbdaisbiasd)9asdsadsad'});
  // } else {
    //   res.status(400).send("Invalid Credentials");
    // }
    
    try {
      const { username, password } = req.body;
      console.log(username,password);

    if (!(username && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ username });
    console.log(user);

    if (user && (await bcrypt.compare(password, user.password))) {
      
        const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      console.log(user);
      res.status(200).json(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;