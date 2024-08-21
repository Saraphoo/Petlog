const pet = require('../models/pet.js');


const savePet = function (req, res) {
    let newPet = new pet();
    console.log(req.body);
    let name = req.body.petName;
    let type = req.body.petType;
    let breed = req.body.petBreed;
    let sex = req.body.petSex;
    let weight = req.body.petWeight;
    let DOB = req.body.petDOB;
    let userId = req.auth.id;
    newPet.petName = name;
    newPet.petType = type;
    newPet.petBreed = breed;
    newPet.petSex = sex;
    newPet.petWeight = weight;
    newPet.petDOB = DOB;
    newPet.user = userId;
    //headers(res);
    if (newPet == null) {
        res.send(404).send({ message: 'Please fill in all Pet info' })
    } else {
        try {
            newPet.save();
            console.log(newPet);
            res.status(200).send({ id: newPet._id });
        } catch(error) {
            res.status(500).send({ message: error.message });
        }
    }
}

const getPet = async function (req, res) {
    const id = req.params.id;
    let petData = await pet.findById(id);
    //headers(res);
    if (petData == null) {
        res.status(404).send({ message: 'Pet not found' })
    } else {
        res.status(200).send(petData);
    }
}

const getUserPet = async function (req, res) {
    let userId = req.auth.id;
    console.log(userId);
    const userPet = await pet.findOne({ user: userId });
    if (!userPet) {
        res.status(200).send({});
    }
    res.status(200).send({ data: userPet, id: userPet.id });
}

const deletePet = async function (req, res) {
    const id = req.params.id;
    let petData = await pet.findById(id);
    //headers(res);
    if (petData == null) {
        res.status(404).send({ message: 'Pet not found' })
    } else {
        petData.deleteOne();
        res.status(200).send({ message: 'Pet Deleted' });
    }
}

const updatePet = async function (req, res) {
    let updatePet = await pet.findById(req.params.id);
    let userId = req.body.user;
    let name = req.body.petName;
    let type = req.body.petType;
    let breed = req.body.petBreed;
    let sex = req.body.petSex;
    let weight = req.body.petWeight;
    let DOB = req.body.petDOB;
    updatePet.petName = name;
    updatePet.petType = type;
    updatePet.petBreed = breed;
    updatePet.petSex = sex;
    updatePet.petWeight = weight;
    updatePet.petDOB = DOB;
    updatePet.user = userId;
    //headers(res);
    if (updatePet == null) {
        res.send(404).send({ message: 'Please fill in all Pet info' })
    } else {
        try {
            updatePet.save();
            console.log(updatePet);
            res.status(200).send({ id: updatePet._id });
        } catch(error) {
            res.status(500).send({ message: error.message });
        }
    }
}

const headers = function (res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
}

module.exports = {
    savePet,
    getPet,
    deletePet,
    updatePet,
    getUserPet
};