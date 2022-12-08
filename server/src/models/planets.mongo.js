const mongoose = require('mongoose');

const planetsSchema = new mongoose.Schema({
  keplerName: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Planet', planetsSchema);