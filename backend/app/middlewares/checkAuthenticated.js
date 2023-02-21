function checkAuthenticated(req,res,next){
  //check if user is authenticated if get a valid cookie
  if(req.isAuthenticated()){
     return next()
  }

  return res.status(401).json({authenticated:false})
}

module.exports.checkAuthenticated = checkAuthenticated