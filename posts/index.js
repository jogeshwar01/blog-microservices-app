const express = require('express');
const bodyParser = require('body-parser');  //json data gets parsed correctly
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
//need to use cors as it blocks requests from one port to another in browser
//like if we do 3000 port for react app and 4000 for posts 

//while testing in postman -add this header
// Content-type   -- application/json

const posts = {};

app.get('/posts', (req, res) => {
    return res.send(posts);
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');  //to generate random id
    const { title } = req.body;

    posts[id] = {
        id, title,
    };

    return res.status(201).send(posts[id]);
});

app.listen(4000, () => {
    console.log('Listening on 4000');
});