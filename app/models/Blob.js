const mongoose = require('mongoose');

const BlobSchema = mongoose.Schema({
    data: Object
});


module.exports = mongoose.model('blob', BlobSchema);