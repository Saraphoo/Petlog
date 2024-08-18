const userController = require('./controllers/UserController');
const PetController = require('./controllers/PetController');
const MedController = require('./controllers/MedController');
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

    app.post('/api/user/create', userController.create); //working
    app.post('/api/pet', PetController.savePet); //working
    app.post('/api/med/:petId', MedController.saveMed); //working
    app.put('/api/pet/:id', PetController.updatePet); // working
    app.put('/api/med/:id', MedController.updateMed);
    app.delete('/api/pet/:id', PetController.deletePet);
    app.delete('/api/med/:id', MedController.deleteMed);
    app.get('/api/pet/:id' , PetController.getPet);
    app.get('/api/pet/user', PetController.getUserPet);
    app.get('/api/med/:id', MedController.getMed);
    app.get('/api/user/info', userController.getUser);
    app.post('/api/login', userController.login);
}
