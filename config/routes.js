
const express = require("express");
const router  = express.Router();

const gamesController = require("../controllers/games");
const authController = require('../controllers/auth');

const secret  =  require('./tokens').secret;


function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({
    message: "Unauthorized" });

  let token = req.headers.authorization.replace('Bearer ', '');

  jwt.verify(token, secret, (err, payload) => {
    if(err) return res.status(401).json({ message: "Unauthorized" });

    req.user = payload;

    next();
  });
}

router.route("/user/register")
  .post(authController.register);


router.route("/user/login")
  .post(authController.login);

router.route("/games")
  .post(secureRoute,gamesController.create)
  .get(gamesController.index);

router.route("/games/:id")
  .all(secureRoute)
  .get(gamesController.show)
  .put(gamesController.update)
  .delete(gamesController.delete);


module.exports = router;
