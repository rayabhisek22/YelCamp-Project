var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
var campground = [
  {name:"Amarnath" ,img:"http://images.jagran.com/amarnath-baltal-b.jpg" },
  {name:"Kedarnath" ,img:"https://www.sacredyatra.com/wp-content/uploads/2015/04/Closer-View-of-Tents-in-Kedarnath.jpg" },
  {name:"Shillong" ,img:"https://www.mountainmarttreks.com/pagegallery/10-days-everest-base-camp-trek85.jpg" }
];

app.get("/",function(req,res){
  res.render("home");
  console.log("Requested the home page");
});

app.get("/campground",function(req,res){
  res.render("campground",{campground:campground});
  console.log("Requested the campground page");
});

app.get("/campground/new",function(req,res){
  res.render("new");
  console.log("Requested the add new campground page");
});

app.post("/campground",function(req,res){
    var newname = req.body.name;
    var newimg = req.body.img;

    var newCampground = {name: newname, img: newimg};
    campground.push(newCampground);
    res.redirect("/campground");
});

app.listen(8080,function(){
  console.log("Yelcamp has started");
});
