var express    = require('express'),
    app        = express(),
    request    = require('request'),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    Comment = require('./models/comments'),
    Campground = require('./models/campground');

    //User = require('./models/user')

//=========================
//APP CONFIG
//=========================
mongoose.connect("mongodb://localhost:27017/yel_camp2",{useNewUrlParser:true},function(err){
  if(err) console.log("error");
  else {
    console.log("connected!");
  }
});
mongoose.set('useFindAndModify', false);

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


//====================================
//RESTFUL ROUTES FOR HOME
//====================================

//Landing Page
app.get("/",function(req,res){
  res.render("home");
  console.log("Requested the home page");
});

//ABOUT
app.get("/about",function(req,res){
  res.render("about");
  console.log("Requested the home page");
});

//====================================
//RESTFUL ROUTES FOR CAMPGROUND
//====================================

//INDEX ROUTE
app.get("/campground",function(req,res){
  Campground.find({},function(err,allCampground){
    if(err){
      console.log("Couldn't find!!");
      console.log(err);
    }else{
      res.render("campgrounds/index",{campground:allCampground});
    }
  });

  console.log("Requested the campground page");
});

//NEW ROUTE
app.get("/campground/new",function(req,res){
  res.render("campgrounds/new");
  console.log("Requested the add new campground page");
});

//CREATE ROUTE
app.post("/campground",function(req,res){
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
app.get("/campground/:id",function(req,res){
  Campground.findOne({_id:req.params.id}).populate("comments").exec(function(err,foundCampground){
    if(err){
      console.log(err);
    } else{
      res.render("campgrounds/show",{campground:foundCampground});
    }
  });

});

//========================================================================
//RESTFUL ROUTES FOR CAMPGROUND/COMMENTS
//========================================================================

//NEW COMMENT
app.get("/campground/:id/comments/new",function(req,res){
  res.render("comments/new",{id:req.params.id});
});

//CREATE COMMENT
app.post("/campground/:id/comments",function(req,res){
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

//=============
//LISTEN
//=============
app.listen(8080,function(){
  console.log("Yelcamp has started");
});
