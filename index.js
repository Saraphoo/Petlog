const routes = require('./app/routes');
const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
// create application/json parser
const jsonParser = bodyParser.json();

app.use(jsonParser);
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_DATABASE_URL);
let port = process.env.PORT || 3000
app.listen(port);

console.log("app is listening on port:" + port);
routes.routes(app);