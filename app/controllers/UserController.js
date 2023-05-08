const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Blob = require('../models/Blob');

require('dotenv').config();

const create = function (req, res) {
    console.log('hi');
    let email = req.body.email;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let newUser = new User();
    newUser.email = email;
    newUser.password = password;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    
    try {
        newUser.save();
        const newBlobData = new Blob({data:{pets:[], medications:[]}, user: newUser.id});
        newBlobData.save();
        res.status(200).send({ message: "user was created" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const login = async function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    console.log(email, password);
    try {
        let existingUser = await User.findOne({ email: email });
        if(!existingUser) {
            throw new Error();
        }
        const compareResult = await bcrypt.compare(password, existingUser.password);
        console.log();
        if (!compareResult) {
            res.status(403).send({ message: 'password does not match'});
        } else {
            const payload = { id: existingUser._id, username: existingUser.email };
            const secretKey = process.env.SECERT_KEY;
            const token = jwt.sign(payload, secretKey, { expiresIn: '3h' });
            res.status(200).send({ token: token, expiresIn: '3h' })
        }
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: 'User not found' });
    }

}
const getUser = async function (req, res) {
  let user =  await User.findById(req.auth.id);
  res.status(200).send(user);
}

module.exports = {
    create,
    login,
    getUser
}