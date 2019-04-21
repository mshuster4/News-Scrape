var db = require("../models");

module.exports = {
  clearDB: function(req, res) {
    db.Article.remove({})
      .then(function() {
        return db.Comment.remove({});
      })
      .then(function() {
        res.json({ ok: true });
      });
  }
};