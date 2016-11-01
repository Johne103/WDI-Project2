const profileRouter  = require("express").Router();
const profilesController = require("../controllers/profiles");

// profileRouter.route("/profile").get(profilesController.profileIndex);
// profileRouter.route("/").get(profilesController.profileIndex);
profileRouter.route("/:character").get(profilesController.profileIndex);
profileRouter.route("/show/:character").get(profilesController.profileShow);

module.exports = profileRouter;
