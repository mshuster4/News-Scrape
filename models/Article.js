// Mongoose
var mongoose = require("mongoose");

// Reference to the Schema constructor
var Schema = mongoose.Schema;

// Article Schema
var ArticleSchema = new Schema({

    headline: {
        type: String,
        required: true
    },

    summary: {
        type: String, 
        require: true,
    },

    image: {
        type: String, 
        require: true
    },

    url: {
        type: String,
        required: true
    },

    comment: {
        type: Schema.Types.ObjectId, 
        ref: "Comment"
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article; 