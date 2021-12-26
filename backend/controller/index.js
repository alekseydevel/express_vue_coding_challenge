const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 9999

const users = require('../user/db.js');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
}) 

app.get('/users', (req, res) => {
    res.end(JSON.stringify(users.getAll()));
})

app.post('/auth/login', (req, res) => {

    if(!req.body.login || !req.body.password) {
        res.status(400);
        res.end();
        return;
    };

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