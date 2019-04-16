
var db = require("../models"); 
var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");
var axios = require("axios");
var cheerio = require("cheerio");
var express = require("express");
var mongoose = require("mongoose");

var router = express.Router();

// A GET route for displaying home page
router.get("/", function(req, res) {
    res.render("index");
});

// A GET route for scraping the NPR website
router.post("/scrape", function(req, res) {
// First, we grab the body of the html with axios
    axios.get("https://www.npr.org/sections/music-news/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    var scrapedArticles = [];

    // Now, we grab every h2 within an article tag, and do the following:
    $("article.has-image").each(function(i, element) {
        // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.headline = $(this)
            .find("h2")
            .text().trim();
            
            result.summary = $(this)
            .find("div.item-info")
            .children("p.teaser")
            .children("a")
            .text();

            result.image = $(this)
            .find("img")
            .attr("src")

            result.url = $(this)
            .find("a")
            .attr("href");

            scrapedArticles.push(result);
            
        });

        console.log(scrapedArticles);

        var hbsArticleObject = {
            articles: scrapedArticles
        };

        res.render("index", hbsArticleObject);
    
    });
});

router.get("/saved", function(req, res) {
    db.Article.find({
        save: true
    })
    .then(function(dbArticle) {
        
        res.render("saved", {
            articles: dbArticle
        })
    })
    .catch(function(err) {
        res.json(err);
    })

});

  
// Route for grabbing a specific Article by id, populate it with it's Comment
router.get("/articles/:id", function(req, res) {

    db.Article.findOne({ _id: req.params.id })

    .populate("comment")
    .then(function(dbArticle) {

        res.json(dbArticle);
    })
    .catch(function(err) {

        res.json(err);
    });
});

// Route for saving/updating an Article's associated Comment
router.post("/articles/:id", function(req, res) {

    db.Comment.create(req.body)
    .then(function(dbNote) {

        return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
    })
    .then(function(dbArticle) {

        res.json(dbArticle);
    })
    .catch(function(err) {

        res.json(err);
    });
});

module.exports = router;

