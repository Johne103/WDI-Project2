const Profile = require("../models/profile");

function getProfileIndex(req, res){
 Profile.characters.findAll(function(err, results) {
   if (err) return res.status(500).json({ message: "Something went wrong.", err });
   return res.status(201).json(results);
 });
}

module.exports = {
  profileIndex: getProfileIndex
};
