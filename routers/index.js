var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var User = require('../models/user');
var passport = require('passport');

//Landing Page
router.get("/",function(req,res){
  res.render("home");
  console.log("Requested the home page");
});

//ABOUT
router.get("/about",function(req,res){
  res.render("about");
  console.log("Requested the home page");
});


router.get("/register",function(req,res){
  res.render('Auth/register');
}) 
//handle sing up logic
router.post("/register",function(req,res){
  var newUser = new User({username:req.body.username});
  User.register(newUser,req.body.password,function(err,user){
    if(err){
      console.log(err);
      res.render("Auth/register");
    }else{
      passport.authenticate("local")(req,res,function(){
        res.redirect("/campground");
      })
    }
  })
})

//show login form
router.get("/login",function(req,res){
  res.render('Auth/login');
})
router.post("/login",passport.authenticate("local",
      {
        successRedirect: "/campground",
        failureRedirect: "/login"
      }), function(req,res){

});

//logout
router.get("/logout",function(req,res){
  req.logout();
  res.redirect("/campground")
})

//middleware
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}
module.exports = router;
