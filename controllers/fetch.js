var axios = require("axios");
var cheerio = require("cheerio")
var db = require("../models");


module.exports = {
  scrapeArticles: function(req, res) {

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

                  console.log(dbArticle);
                })
                .catch(function(err) {
                  
                  console.log(err);
                });

            });

      
        });
    }
}
