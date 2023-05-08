const mongoose = require('mongoose');

const BlobSchema = mongoose.Schema({
    data: Object,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'blob',
    }
});


module.exports = mongoose.model('blob', BlobSchema);