
const express = require("express");
const profileRouter  = express.Router();
const profilesController = require("../controllers/profiles");

profileRouter.route("/profile").get(profilesController.profileIndex);

module.exports = profileRouter;
