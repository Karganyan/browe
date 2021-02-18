const mongoose = require('mongoose');

const coffeeSchema = mongoose.Schema({
  title: String,
  desctription: String,
  visible: { type: Boolean, default: true },
  imgURL: { type: String, default: 'There is no picture' },
});
module.exports = mongoose.model('Coffee', coffeeSchema);
