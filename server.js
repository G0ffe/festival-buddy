const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const {Festival} = require('./models');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./Client'))


app.get('/festivals', (req, res) => {
    Festival
    .find()
    .then(festivals => {
        res.json({
            festivals: festivals.map(
                (festival) => festival.apiRepr())
        });
    })
    .catch(
        err => {
            console.error(err);
            res.status(500).json({message: 'Internal server error'});
        });
});

app.get('/festivals/:id', (req, res) => {
    Festival
    .findById(req.params.id)
    .then(festival => res.json(festival.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'})
    });
});

app.post('/festivals', (req, res) => {
console.log(req.body);
    const requiredFields = ['name', 'date', 'time', 'location'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing '${field}' in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }

    Festival
    .create({
        name: req.body.name,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location
    })
    .then(
        festival => res.status(201).json(festival.apiRepr()))
        .catch(err => {
            res.status(500).json(err);
        });
});

app.put('/festivals/:id', (req, res) => {
    //if(!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    //   const message = (`Request path id (${req.params.id}) and request body id ` +
    //    `(${req.body.id}) must match`);
    //    console.error(message);
    //    res.sendStatus(400).json({message: message});
    //}

    const toUpdate = {};
    const updateableFields = ['name', 'date', 'time', 'location'];

    updateableFields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });

    Festival
    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .then(festival => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

app.delete('/festivals/:id', (req, res) => {
    Festival
    .findByIdAndRemove(req.params.id)
    .then(festival => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Inter server error'}));
});

app.use('*', function(req, res) {
    res.status(404).json({message: 'Not Found'});
});


let server;

function runServer(database_url=DATABASE_URL, port=PORT) {

    return new Promise((resolve, reject) => {
        mongoose.connect(database_url,err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
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
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.server(err));
};

module.exports = {app, runServer, closeServer};