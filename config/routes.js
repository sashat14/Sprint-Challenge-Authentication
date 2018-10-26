const axios = require('axios');
const bcrypt = require('bcryptjs');
const { authenticate, generateToken } = require('./middlewares');
const db = require('../database/dbConfig.js');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login, generateToken);
  server.get('/api/jokes', authenticate, getJokes);
  server.get('/api/users', listUsers);
};

function register(req, res) {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;
  
  db('users').insert(credentials)
  .then(ids => {
    const id = ids[0];
    res.status(201).json({newUser:id})
})
.catch(err => {
    res.status(500).send(err.message)
  })
}

function login(req, res) {
  const creds = req.body;
  db('users')
  .select('*')
  .where({username:creds.username}).first()
  .then(user => {
    if(user && bcrypt.compareSync(creds.password, user.password)){
        const token = generateToken(user);
        res.status(201).send({message: "Welcome " + user.username, token})
    }else{
        res.status(401).send({message: "UserId or password incorrect"})
    }
})
.catch(err => {
    res.status(500).send(err.message)
  })
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

function listUsers(req, res) {
  db('users')
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.send(err.message)
  })
}