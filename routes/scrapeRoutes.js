
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

            var entry = new Article(result);

            entry.save(function(err, doc) {

                if (err) {
                    console.log(err)
                }
                else {
                    console.log(doc);
                }

            });

        });


    });

    db.Article.find({})
    .then(function(dbArticle){
        res.render("index", {articles: dbArticle})
    })
    .catch(function(err) {
        res.jons(err);
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

  
module.exports = router;

