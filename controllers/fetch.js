var scrape = require("../scripts/scrape")
var db = require("../models");


module.exports = {
  scrapeArticles: function(req, res) {

    return scrape()
      .then(function(articles) {
        return db.Article.create(articles);
      })
      .then(function(dbArticle) {
        if (dbArticle.length === 0) {
          res.json({
            message: "No new articles today.  Check back tomorrow."
          })
        }
        else {
          res.json({
            message: "Added" + dbArticle.length + "new articles!"
          })
        }
      })
      .catch(function(err) {
        res.json({
          message: "Scrape complete!"
        })
      })

  }
};
