const blob = require('../models/Blob');
const saveBlob = function(req , res){
    let blobData = req.body;
    headers(res);
    const newBlobData = new blob({ data: blobData });
    newBlobData.save();
    res.status(200).send({id: newBlobData._id});
}

const getBlob = async function(req, res){
    const id = req.params.id;
    let blobData = await blob.findById(id);
    headers(res);
    console.log(blob);
    if(blobData == null){
        res.status(404).send({message:'Blob not found'})
    }else{
        res.status(200).send(blobData.data);
    }
}

const deleteBlob = async function(req, res ){
    const id = req.params.id;
    let blobData = await blob.findById(id);
    headers(res);
    if(blobData == null){
        res.status(404).send({message:'Blob not found'})
    }else{
        blobData.deleteOne();
        res.status(200).send({message:'Blob Deleted'});
    }
}

const updateBlob = async function(req, res){
    const id = req.params.id;
    let blobData = await blob.findById(id);
    headers(res);
    if(blobData == null){
        res.status(404).send({message:'Blob not found'})
    }else{
        blobData.data = req.body;
        blobData.save();
        res.status(200).send({message:'Save Successful'})
    }
}

const headers = function(res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
}

module.exports = {saveBlob,getBlob,deleteBlob,updateBlob};