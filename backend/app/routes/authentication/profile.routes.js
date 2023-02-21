const express = require('express');
const router = express.Router();
const User = require('../../models/user.model')

//route to update user profile
router.post('/update-profile', async (req, res, next) => {
    let {profileImage, profileBio} = req.body
    let userID = req.user._id 
    let profileUser = await User.findOne({_id : userID}) 
    //check if profile image present then change it
    if(profileImage){
        profileUser.profilePic = profileImage
    }
    //check if profile bio present then change it
    if(profileBio){
        profileUser.profileBio =  profileBio
        
    }
    let response = await profileUser.save()
    //update the user session after updating the db
    req.session.passport.user=response;
    return res.status(200).json({user:response});
});




module.exports = router;