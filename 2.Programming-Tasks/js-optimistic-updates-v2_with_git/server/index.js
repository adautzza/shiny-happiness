const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const esbuild = require('esbuild');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const InMemoryDB = {
    persons: [],
};

const createRandomNumber = function(min, max) {
  return Math.random() * (max - min) + min;
};

const createTimeout = function(callback) {
    const duration = createRandomNumber(1000, 3000);
    setTimeout(callback, duration);
};

esbuild.build({
    entryPoints: ['./client/index.js'],
    outdir: './build',
    bundle: true,
    watch: true,
    sourcemap: true,
    loader: {
        '.js': 'jsx',
    },
});

app.use('/app', express.static('./public'));
app.use('/app', express.static('./build'));

app.get('/persons', function(req, res) {
    res.send(InMemoryDB.persons);
});

app.post('/reset', function(req, res) {
    InMemoryDB.persons = [];
    res.sendStatus(200);
});

app.post('/persons', function(req, res) {
    console.log('POST', req.body);

    const { name } = req.body;

    const person = {
        id: uuidv4(),
        name,
    };

    InMemoryDB.persons.push(person);

    createTimeout(function() {
        res.send(person);
    });
});

app.patch('/persons', function(req, res) {
    console.log('PATCH', req.body);

    const { id, name } = req.body;

    const idx = InMemoryDB.persons.findIndex(person => person.id === id);
    if (idx < 0) return res.sendStatus(400);

    const personBefore = InMemoryDB.persons[idx];
    const personAfter = { ...personBefore, name };

    InMemoryDB.persons.splice(idx, 1, personAfter);

    createTimeout(function() {
        res.send(personAfter);
    });
});

app.listen(3000, () => {
    console.log('App accessible at http://localhost:3000 - good luck!');
});
