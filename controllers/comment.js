var db = require("../models");

module.exports = {
  // Find 
  find: function(req, res) {
    db.Comment.find({ _articleId: req.params.id }).then(function(dbComment) {
      res.json(dbComment);
    });
  },
  // Create 
  create: function(req, res) {
    db.Comment.create(req.body).then(function(dbComment) {
      res.json(dbComment);
    });
  },
  // Delete 
  delete: function(req, res) {
    db.Comment.deleteOne({ _id: req.params.id }).then(function(dbComment) {
      res.json(dbComment);
    });
  }
};
