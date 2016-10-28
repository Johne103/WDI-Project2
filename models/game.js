const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema ({
  // points: Number,
  // countries: [String],
  player1: {
    name: String,
    points: Number,
    countries: [String]
  },
  player2: {
    name: String,
    points: Number,
    countries: [String]
  }
});


// dogSchema.set("toJSON", {
//
// });

module.exports = mongoose.model("Game", gameSchema);
