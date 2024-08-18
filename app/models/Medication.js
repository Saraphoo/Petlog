const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MedSchema = mongoose.Schema({
        pet : {type: mongoose.Schema.Types.ObjectId, ref: "pet"},
        medName : String,
        medType : String,
        medDosage : String,
        numberOfDailyDosage: Number,
        notes : String
});

module.exports = mongoose.model('medication', MedSchema);