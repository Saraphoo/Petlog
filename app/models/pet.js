const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const PetSchema = mongoose.Schema({
        petName : String,
        petType : String,
        petBreed : String,
        petSex : String,
        petweight : String,
        petDOB : Date,
        user : {type: mongoose.Schema.Types.ObjectId, ref: "user"}
});

module.exports = mongoose.model('pet', PetSchema);