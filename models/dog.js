const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema ({
  name: String,
  breed: String,
  age: Number
});


// dogSchema.set("toJSON", {
//
// });

module.exports = mongoose.model("Dog", dogSchema);
