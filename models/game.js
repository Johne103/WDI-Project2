const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema ({
  // points: Number,
  // countries: [String],
  player1: {
    name: String,
    points: Number,
    countries: [String] // e.g. ['GB', 'IE', 'AT']
  },
  player2: {
    name: String,
    points: Number,
    countries: [String]
  }
});

module.exports = mongoose.model("Game", gameSchema);
