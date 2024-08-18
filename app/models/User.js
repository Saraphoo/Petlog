const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true 
    },
    firstName: String,
    lastName: String,
    password: {
        type: String,
        required: true
    },
    pets: [{type: mongoose.Schema.Types.ObjectID, ref: "pet"}]
},
    {
        timestamps: true // add createdAt and updatedAt timestamps
    });


UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        return next();
    } catch (error) {
        return next(error);
    }
});
module.exports = mongoose.model('user', UserSchema);