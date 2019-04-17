
var db = require("../models"); 
var axios = require("axios");
var cheerio = require("cheerio");


module.exports = function(app) {

    // A GET route for displaying home page
    app.get("/", function(req, res) {
        res.render("index");
    });

    // A GET route for scraping the NPR website
    app.get("/scrape", function(req, res) {
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

                db.Article.create(result)
                    .then(function(dbArticle) {
                        console.log(dbArticle)
                    })
                    .catch(function(err) {
                        console.log(err)
                    });
        
                });

            res.redirect("/articles");

        });

    });

    app.get("/articles", function(req, res) {
        // Grab every document in the Articles collection
        db.Article.find({})
           .sort({ timestamp: -1 })
          .then(function(dbArticles) {
            // If we were able to successfully find Articles, send them back to the client
            var hbsObj = {
                articles: dbArticles
            };

            res.render("index", hbsObj);
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
          });

    });
      


};

