// Mongoose
var mongoose = require("mongoose");

// Reference to the Schema constructor
var Schema = mongoose.Schema;

// Article Schema
var ArticleSchema = new Schema({

    headline: {
        type: String,
        required: true,
        unique: { index: { unique: true } }
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

    saved: {
        type: Boolean,
        default: false
    },

    date: {
        type: Date,
        default: Date.now
    },
    
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article; 