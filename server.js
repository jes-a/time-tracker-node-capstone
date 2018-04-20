'use strict';

const User = require('./models/users');
const Job = require('./models/jobs');
const Boat = require('./models/boats')
const express = require('express');
const morgan = require('morgan');

const app = express();

const { DATABASE_URL, PORT } = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});



// ---------------- RUN/CLOSE SERVER -----------------------------------------------------
let server;

function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                    console.log(`Listening on localhost:${port}`);
                    resolve();
                })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    }));
}

if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}

// ---------------USER ENDPOINTS------------------------------
// POST
// Create a new user
app.post('/users/create', (req, res) => {

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let phoneNumber = req.body.phoneNumber;
    let address = req.body.address;
    let address2 = req.body.address2;
    let city = req.body.city;
    let state = req.body.state;
    let zipCode = req.body.zipCode;
    let type = req.body.type;
    let status = req.body.status;
    let email = req.body.email;
    let password = req.body.password;
    password = password.trim();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error on genSalt'
            });
        }

        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error on hash'
                });
            }

            User.create({
                firstName,
                lastName,
                phoneNumber,
                address,
                address2,
                city,
                state,
                zipCode,
                email,
                type,
                status,
                password: hash,
            }, (err, item) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal Server Error on user.create'
                    });
                }
                if (item) {
                    console.log(`User \`${firstName}\` created.`);
                    return res.json(item);
                }
            });
        });
    });
});

// User log in 
app.post('/signin', function (req, res) {
    User
        .findOne({
            email: req.body.email
        }, function(err, items) {
            if (err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
            if (!items) {
                //bad email
                return res.status(401).json({
                    message: "Not found"
                });
            } else {
                items.validatePassword(req.body.password, function(err, isValid) {
                    if (err) {
                        console.log('There was an error validating email or password.');
                    }
                    if (!isValid) {
                        return res.status(401).json({
                            message: "Not found"
                        });
                    } else {
                        console.log("user logged in successfully");
                        return res.json(items);
                    }
                });
            };   
        });
});

// Create a new boat
app.post('/boats/create', (req, res) => {

    let boatName = req.body.boatName;
    let boatMake = req.body.boatMake;
    let boatLength = req.body.boatLength;
    let boatAddress = req.body.boatAddress;
    let boatAddress2 = req.body.boatAddress2;
    let boatCity = req.body.boatCity;
    let boatState = req.body.boatState;
    let boatZipCode = req.body.boatZipCode;
    let boatNotes = req.body.boatNotes;
    let custFirstName = req.body.custFirstName;
    let custLastName = req.body.custLastName;
    let custEmail = req.body.custEmail;
    let custPhone = req.body.custPhone;
    let custAddress = req.body.custAddress;
    let custAddress2 = req.body.custAddress2;
    let custCity = req.body.custCity;
    let custState = req.body.custState;
    let custZipCode = req.body.custZipCode;

            Boat.create({
                boatName, 
                boatMake, 
                boatLength, 
                boatAddress, 
                boatAddress2, 
                boatCity, 
                boatState, 
                boatZipCode, 
                boatNotes, 
                custFirstName, 
                custLastName, 
                custEmail,
                custPhone,
                custAddress,
                custAddress2,
                custCity,
                custState,
                custZipCode,
            }, (err, item) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal Server Error on boat.create'
                    });
                }
                if (item) {
                    console.log(`Boat \`${boatName}\` created.`);
                    return res.json(item);
                }
            });
});

// Create a new job
app.post('/jobs/create', (req, res) => {
    let jobName = req.body.jobName;
    let services = req.body.services;
    let serviceDate = req.body.serviceDate;
    let assignTo = req.body.assignTo;
    let jobNotes = req.body.jobNotes;

        Job.create({
            jobName, 
            services, 
            serviceDate, 
            assignTo, 
            jobNotes,
        }, (err, item) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error on job.create'
                });
            }
            if (item) {
                console.log(`Job \`${jobName}\` created.`);
                return res.json(item);
            }
        });
});

// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;