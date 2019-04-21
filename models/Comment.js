var mongoose = require("mongoose");

// Reference to Schema constructor
var Schema = mongoose.Schema;

// Comment Schema 
var CommentSchema = new Schema({

    _articleId: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    },

    date: {
        type: Date,
        default: Date.now
    },

    commentText: String
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment; 