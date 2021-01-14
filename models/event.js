const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  title: String,
  theme: String,
  desctription: String,
  descriptionDate: String,
  imgURL: { type: String, default: 'There is no picture' },
  visible: { type: Boolean, default: true },
  urlChat: String,
});

module.exports = mongoose.model('Event', eventSchema);
