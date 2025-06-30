const mongoose = require('mongoose');
const GameSchema = new mongoose.Schema({
  player: String,
  status: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Game', GameSchema);