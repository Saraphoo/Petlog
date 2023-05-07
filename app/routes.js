const userController = require('./controllers/UserController');
const blobController= require('./controllers/BlobController');
exports.routes = function(app) {
    app.post('/api/signin', userController.signin);
    app.post('/api/blob', blobController.saveBlob);
    app.get('/api/blob/:id',blobController.getBlob);
    app.delete('/api/blob/:id',blobController.deleteBlob);
    app.put('/api/blob/:id', blobController.updateBlob);
}
