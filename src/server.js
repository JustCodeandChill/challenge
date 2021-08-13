'use strict';
const express = require('express');
const path = require('path')
const cors = require('cors')

const app = express();
const registerRoutes = require('./routes');
const {clientErrorHandler} = require("./middleware");
// server config
const port = process.env.PORT || 3000;

// prevent crash
app.use(clientErrorHandler);

// enable cors
app.use(cors());

// serve static file
const publicPath = path.join(__dirname, '../', 'public');
app.use('/', express.static(publicPath));

// register routes
registerRoutes(app);

// create server start method
const start = () => {
    return new Promise((resolve, reject) => {
        // start the server
        app.listen(port, () => {
            console.log(`Connected to Port ${port}`);
            resolve()
        });
    }).catch((error) => {
        console.log(`failed to start server => ${error.message}`)
    });
}

module.exports = start;


