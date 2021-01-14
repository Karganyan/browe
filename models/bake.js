const mongoose = require('mongoose');

const bakeSchema = mongoose.Schema({
  title: String,
  desctription: String,
  visible: { type: Boolean, default: true },
  imgURL: { type: String, default: 'There is no picture' },
});

module.exports = mongoose.model('Bake', bakeSchema);
