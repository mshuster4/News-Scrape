var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function() {

   return axios.get("https://www.npr.org/sections/music-news/").then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector

          var $ = cheerio.load(response.data);

          var articles = [];

          // Now, we grab every h2 within an article tag, and do the following:
          $("article.has-image").each(function(i, element) {
            
              
              var headline = $(this)
                .find("h2")
                .text().trim();
              
              var summary = $(this)
                .find("div.item-info")
                .children("p.teaser")
                .children("a")
                .text();

              var image = $(this)
                .find("img")
                .attr("src")

              var url = $(this)
                .find("a")
                .attr("href");

              if (headline && summary && url) {
                  var articleData = {
                      headline: headline,
                      summary: summary,
                      image: image,
                      url: url
                  };

                  articles.push(articleData);
              }

        });
        return articles;
    });
}

module.exports = scrape;