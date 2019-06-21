var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

//INDEX ROUTE
router.get("/",function(req,res){
  Campground.find({},function(err,allCampground){
    if(err){
      console.log("Couldn't find!!");
      console.log(err);
    }else{
      res.render("campgrounds/index",{campground:allCampground,currentuser:req.user});
    }
  });

  console.log("Requested the campground page");
});

//NEW ROUTE
router.get("/new",function(req,res){
  res.render("campgrounds/new");
  console.log("Requested the add new campground page");
});

//CREATE ROUTE
router.post("/",function(req,res){
    Campground.create(req.body.campground,function(err,camp){
      if(err){
        console.log("Error!");
      }else{
        console.log("Created!");
        res.redirect("campground");
      }
    });

});

//SHOW ROUTE
router.get("/:id",function(req,res){
  Campground.findOne({_id:req.params.id}).populate("comments").exec(function(err,foundCampground){
    if(err){
      console.log(err);
    } else{
      res.render("campgrounds/show",{campground:foundCampground});
    }
  });

});

module.exports = router;
