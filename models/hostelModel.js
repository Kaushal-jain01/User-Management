const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  room_number: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  price_per_night: {
    type: Number,
    required: true
  }
});

const hostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  rooms: {
    type: [roomSchema],
    required: true
  }
});

const Hostel = mongoose.model('Hostel', hostelSchema);

module.exports = Hostel;
