const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 9999

const users = require('../db/users.js');
const cors = require('../middleware/cors');

app.use(bodyParser.json());
app.use(cors);

app.get('/users', (req, res) => {
    res.end(JSON.stringify(users.getAll()));
})

app.post('/auth/login', (req, res) => {

    if(!req.body.login || !req.body.password) {
        res.status(400);
        res.end();
        return;
    }

    const user = users.getUserLoginAndPassword(req.body.login, req.body.password);

    if(!user) {
        res.status(401);
        res.end();
        return;
    }

     res.status(200);
     res.end();
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})