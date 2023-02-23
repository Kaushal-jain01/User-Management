const mongoose = require('mongoose');


const hostelSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    vacancy: {
        type: Number,
        default: 1      
    },
    contact: {
        type: String,
        required: true
    }

})


module.exports =  mongoose.model('Hostel', hostelSchema);

const Hostel = mongoose.model('Hostel', hostelSchema);

module.exports = Hostel;
