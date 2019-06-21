var express = require('express');
var router = express.Router({mergeParams:true});
var Campground = require('../models/campground');
var Comment = require('../models/comments');

//NEW COMMENT
router.get("/new",isLoggedIn,function(req,res){
  res.render("comments/new",{id:req.params.id});
});

//CREATE COMMENT
router.post("/",isLoggedIn,function(req,res){
  Campground.findById(req.params.id,function(err,camp){
    if(err){
      console.log("1");
      console.log(err);
    }else{
      Comment.create(req.body.comments,function(err,comment){
        camp.comments.push(comment);
        camp.save(function(err,camp){
          if(err){
            console.log("2");
            console.log(err);
          } else{
            console.log(camp);
            res.redirect("/campground/"+req.params.id);
          }
        });
      });
    }
  });
});

//middleware
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}
module.exports = router;
