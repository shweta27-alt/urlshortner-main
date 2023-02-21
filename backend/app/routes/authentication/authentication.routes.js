const express = require('express');
const router = express.Router();
const User = require('../../models/user.model');
const passport = require('passport');
const {checkAuthenticated} = require('../../middlewares')
const rateLimit = require('express-rate-limit')

//limit the request if it is more the 10 request per minute
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10, //max request allowed per windowMs
  message: { message: 'Too many requests. Try again after some time.' },
  keyGenerator: function (req) {
      return `chatify-rate-limiter-${req.ip}`; //key for the request including user ip
  },
});

//route to login with username password
router.post('/login',limiter, async(req,res)=>{
  //calling passport local stratergy
  passport.authenticate('local', function (err, user, info) {
    //if not get any user from local stratergy done
    if (!user || err) {
        return res.status(400).json({
            message: (err && err.message) || 'Oops something went wrong',
        });
    }
    //if successfully authenticated login using login middleware
    req.login(user, (err, data) => {
        if (err) {
            return res.status(400).json({
                message: err.message || 'Oops something went wrong',
            });
        }
        res.json({
            user: user,
        });
    });
})(req, res);

})

//route to logout user
router.post('/logout',async(req,res)=>{
  req.logout(req,res)
  .then(()=>{
    return res.status(200).json({ message : {success : true}})
  })
  .catch(()=>{
  return res.status(400).json({message : "Oops something went wrong"})
  })
})

//route to register new user 
router.post('/register/form',limiter, async (req, res) => {
  let { body } = req
  let { fullName, phoneNumber, countryCode = 91, emailAddress, password } = body
  //validation for all fields 
  if (!fullName) {
    return res.status(400).json({ message: "Invalid FullName" })
  }

  if (!phoneNumber && phoneNumber.length != 10) {
    return res.status(400).json({ message: "Invalid PhoneNumber" })
  }

  if (!emailAddress) {
    return res.status(400).json({ message: "Invalid EmailAddress" })
  }


  if (!password) {
    return res.status(400).json({ message: "Invalid password" })
  }

   //check if phone number registerd to any other user
  let phoneUser = await User.getUserByPhoneNumber(phoneNumber, countryCode)
  if (phoneUser) {
    return res.status(400).json({ message: "Phone number already taken" })
  }


  //check if email registerd to any other user
  let emailUser = await User.getUserByEmail(emailAddress)
  if (emailUser) {
    return res.status(400).json({ message: "Email already taken" })
  }

  //create a user 
  let newUser = {
    email: emailAddress,
    mobile: {
      phoneNumber,
      countryCode
    },
    fullName: fullName,
    username: emailAddress
  }

 //It save the user in db and hash the password and user get logged in
  let user = await User.register(new User(newUser), password)
  return req.login(user, async (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({
      user
    });
  });
})

//route to user session for a valid session check
router.get('/usersession', checkAuthenticated,async(req,res,next)=>{
   res.json({user:req.user})
})

//router to reset the password
router.post('/reset-password', limiter,async(req,res)=>{
   let{ password, username} = req.body
   if(!(username || password)){
    return res.status(400).json({message:"Invalid username and password"})
   }
   
   User.resetPassword(username, password).then((response)=>{
    res.status(200).json({success:true})
   }).catch((error)=>{
    res.status(400).json({message:error})
   })
})

module.exports = router;