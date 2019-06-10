var express    = require('express'),
    app        = express(),
    request    = require('request'),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose');

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//Mongo DB setup===================================================================================================
mongoose.connect("mongodb://localhost:27017/yel_camp",{useNewUrlParser:true},function(err){
  if(err) console.log("error");
  else {
    console.log("connected!");
  }
});

var schema = mongoose.Schema;
var campgroundSchema = new schema({
  name : String,
  img : String,
  description : String
});

var campground = mongoose.model("campground",campgroundSchema);

//RESTFUL ROUTES=====================================================================================================

//HOME============================================
app.get("/",function(req,res){
  res.render("home");
  console.log("Requested the home page");
});

//ABOUT============================================
app.get("/about",function(req,res){
  res.render("about");
  console.log("Requested the home page");
});

//INDEX============================================
app.get("/campground",function(req,res){

  campground.find({},function(err,allCampground){
    if(err){
      console.log("Couldn't find!!");
      console.log(err);
    }else{
      res.render("index",{campground:allCampground});
    }
  });

  console.log("Requested the campground page");
});

//NEW============================================
app.get("/campground/new",function(req,res){
  res.render("new");
  console.log("Requested the add new campground page");
});

//CREATE=========================================
app.post("/campground",function(req,res){
    var newname = req.body.name;
    var newimg = req.body.img;
    var newdescription = req.body.description;

    var newCamp = {name:newname,img:newimg,description:newdescription};

    campground.create(newCamp,function(err,camp){
      if(err){
        console.log("Error!");
      }else{
        console.log("Created!");
        res.redirect("campground");
      }
    });

});

//SHOW======================================
app.get("/campground/:id",function(req,res){
  campground.findById(req.params.id,function(err,foundCampground){
    if(err){
      console.log(err);
    }else{
      res.render("show",{campground:foundCampground});
    }
  });

});

//LISTEN=================================================================================================================
app.listen(8080,function(){
  console.log("Yelcamp has started");
});
