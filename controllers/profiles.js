const Profile    = require("../models/profile");

// function getProfileIndex(req, res){
//   const characters = ["spider-man', 'hulk', 'wolverine', 'gambit', 'cyclops'"];
//   Profile.characters.findAll(100, 2, function(err, results) {
//     if (err) return res.status(500).json({ message: "Something went wrong.", err });
//    return res.status(201).json(results);
//   });
// }

function getProfileIndex(req, res){
  console.log(req.params);
  Profile.characters.findByName(req.params.character, function(err, results) {
    console.log(err);
    if (err) return res.status(500).json({ message: "Something went wrong.", err });
    return res.status(201).json(results);
  });
}

function getProfileShow(req, res){
  console.log(req.params);
  Profile.characters.find(req.params.character, function(err, results) {
    if (err) return res.status(500).json({ message: "Something went wrong.", err });
    return res.status(201).json(results);
  });
}

// function getProfiles(req, res){
//   Profile.characters.findByName(req.body, function(err, results) {
//     if (err) return res.status(500).json({ message: "Something went wrong.", err });
//     return res.status(201).json(results);
//   });
// }

module.exports = {
  profileIndex: getProfileIndex,
  profileShow: getProfileShow
};
