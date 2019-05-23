var db = require("../models");

module.exports = {
  // Find 
  findAll: function(req, res) {
    db.Article
      .find(req.query)
      .sort({ date: 1 })
      .then(function(dbArticle) {
        res.json(dbArticle);
      });
  },
  // Delete 
  delete: function(req, res) {
    db.Article.remove({ _id: req.params.id }).then(function(dbArticle) {
      res.json(dbArticle);
    });
  },
  // Update 
  update: function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then(function(dbArticle) {
      res.json(dbArticle);
    });
  }
};
