
const express = require("express");
const router  = express.Router();

const usersController = require("../controllers/users");
const authController = require('../controllers/auth');

const jwt    = require("jsonwebtoken");
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


router.route("/user/:id")
  .all(secureRoute)
  .get(usersController.show)
  .put(usersController.update)
  .delete(usersController.delete);

router.route("/user")
  .get(authController.index);

module.exports = router;
