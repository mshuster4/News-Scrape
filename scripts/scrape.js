var axios = require("axios");
var cheerio = require("cheerio")

var scrape = function() {
// First, we grab the body of the html with axios
    axios.get("https://www.npr.org/sections/music-news/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector

        var $ = cheerio.load(response.data);

        var articles = [];

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

            articles.push(result);

            console.log(articles)
        
        });

        return articles;
    });
};

module.exports = scrape;
