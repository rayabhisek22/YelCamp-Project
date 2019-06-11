var mongoose = require('mongoose');

var schema = mongoose.Schema;
var campgroundSchema = new schema({
  name : String,
  img : String,
  description : String,
  comments: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Comment"
    }
  ]
});

module.exports = mongoose.model("Campground",campgroundSchema);
