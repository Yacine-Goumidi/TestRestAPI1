const express = require('express');
const bodyParser = require('body-parser')


const app = express();
const port = 3000;

app.use(bodyParser.json());

let tasks =  [
    {id: 1, description: 'Faire les courses'},
    {id: 2, description: 'Faire à manger'}
];


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})

