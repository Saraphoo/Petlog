const medication = require('../models/Medication.js');


const saveMed = function(req , res){
    //console.log(req.body);
    let newMed = new medication();
    let medPet = req.params.petID;
    let name = req.body.medName;
    let type =req.body.medType;
    let dosage = req.body.medDosage;
    let dailyDosage = req.body.numberOfDailyDosage;
    console.log(req.auth);
    //headers(res);
    newMed.pet= medPet;
    newMed.medName = name;
    newMed.medType = type;
    newMed.medDosage = dosage;
    newMed.numberOfDailyDosage = dailyDosage;

    if (newMed == null) {
        res.send(404).send({ message: 'Please fill in all Medication info' })
    } else {
        try {
            newMed.save();
            console.log(newMed);
            res.status(200).send({ id: newMed._id });
        } catch(error) {
            res.status(500).send({ message: error.message });
        }
    }
}



const getMed = async function(req, res){
    const id = req.params.id;
    let medData = await med.findById(id);
    headers(res);
    console.log(Med);
    if(medData == null){
        res.status(404).send({message:'Med not found'})
    }else{
        res.status(200).send(medData.data);
    }
}
const getUserMed = async function(req , res) {
    let userId = req.auth.id;
    console.log(userId)
    const userMed = await med.findOne({user: userId});
    if(!userMed){
        res.status(200).send({});
    }
    res.status(200).send({data: userMed.data , id: userMed.id});
}

const deleteMed = async function(req, res ){
    const id = req.params.id;
    let medData = await med.findById(id);
    headers(res);
    if(medData == null){
        res.status(404).send({message:'Med not found'})
    }else{
        medData.deleteOne();
        res.status(200).send({message:'Med Deleted'});
    }
}

const updateMed = async function(req, res){
    const id = req.params.id;
    let medData = await med.findById(id);
    headers(res);
    if(medData == null){
        res.status(404).send({message:'Med not found'})
    }else{
        medData.data = req.body;
        medData.save();
        res.status(200).send({message:'Save Successful'})
    }
}

const headers = function(res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
}

module.exports = {
    saveMed,
    getMed,
    deleteMed,
    updateMed,
    getUserMed
};