var mongoose = require("mongoose");

// Reference to Schema constructor
var Schema = mongoose.Schema;

// Comment Schema 
var CommentSchema = new Schema({

    title: String,
    body: String
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment; 