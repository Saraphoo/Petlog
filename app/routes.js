const userController = require('./controllers/UserController');
const blobController = require('./controllers/BlobController');
const { expressjwt: jwt } = require("express-jwt");

require('dotenv').config();


exports.routes = function (app) {
    app.use(jwt({ secret: process.env.SECERT_KEY, algorithms: ["HS256"] }).unless({ path: ['/api/login', '/api/user/create'] }));
    app.use(function (err, req, res, next) {
        if (err.name === "UnauthorizedError") {
            res.status(401).send({ "message": "invalid token..." });
        } else {
            next(err);
        }
    });
    app.post('/api/user/create', userController.create);
    app.get('/api/user/info', userController.getUser);
    app.post('/api/login', userController.login);
    app.post('/api/blob', blobController.saveBlob);
    app.get('/api/blob/user', blobController.getUserBlob)
    app.get('/api/blob/:id', blobController.getBlob);
    app.delete('/api/blob/:id', blobController.deleteBlob);
    app.put('/api/blob/:id', blobController.updateBlob);
}
