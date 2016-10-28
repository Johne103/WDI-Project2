const Game = require("../models/game");

function gamesCreate(req, res) {
 Game.create(req.body, (err, game) => {
   if (err) return res.status(500).json({ success: false, message: err });
   if (!game) return res.status(500).json({ success: false, message: "Please send the correct information to create a game." });
   return res.status(201).json(game);
 });
}

function gamesIndex(req, res) {
 Game.find((err, games) => {
   if (err) return res.status(500).json({ success: false, message: err });
   if (!games) return res.status(500).json({ success: false, message: "No games found" });
   return res.status(200).json(games);
 });
}

function gamesShow(req, res) {
  Game.findById(req.params.id, (err, game) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    if (!game) return res.status(404).json({ message: "User not found." });
    return res.status(200).json(game);
  });
}

function gamesUpdate(req, res) {
  Game.findByIdAndUpdate(req.params.id, req.body, { new: true },  (err, game) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    if (!game) return res.status(404).json({ message: "User not found." });
    return res.status(200).json(game);
  });
}

function gamesDelete(req, res) {
  Game.findByIdAndRemove(req.params.id, (err, game) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    if (!game) return res.status(404).json({ message: "User not found." });
    return res.status(204).send();
  });
}

module.exports = {
  create: gamesCreate,
  index: gamesIndex,
  show: gamesShow,
  update: gamesUpdate,
  delete: gamesDelete
};
