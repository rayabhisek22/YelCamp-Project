var mongoose = require('mongoose');

var schema = mongoose.Schema;
var commentSchema = new schema({
  name : String,
  body: String
});

module.exports = mongoose.model("Comment",commentSchema);
