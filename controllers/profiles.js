const Profile = require("../models/profile");

function getProfileIndex(req, res){
 Profile.characters.findAll(100, 2, function(err, results) {
   if (err) return res.status(500).json({ message: "Something went wrong.", err });
   return res.status(201).json(results);
 });
}

// function getProfiles(req, res){
//   console.log(req.body);
//  Profile.characters.findByName(req.body, function(err, results) {
//    if (err) return res.status(500).json({ message: "Something went wrong.", err });
//    return res.status(201).json(results);
//  });
// }

module.exports = {
  profileIndex: getProfileIndex
};
