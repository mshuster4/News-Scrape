var router = require("express").Router();

var fetchRoutes = require("./fetch");
var commentRoutes = require("./comments");
var articleRoutes = require("./articles");
var clearRoutes = require("./clear");

router.use("/fetch", fetchRoutes);
router.use("/comments", commentRoutes);
router.use("/articles", articleRoutes);
router.use("/clear", clearRoutes);

module.exports = router;
