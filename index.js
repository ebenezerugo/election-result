const express = require('express');
const bodyParser = require("body-parser");

const db = require('./models');
const electionApi = require('./api/election');

const app = express();

const port = process.env.PORT || 9000;


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

electionApi(app,db);

app.get('/', function (req, res) {
    res.render('index');
});

// app.post('/submit-data', function (req, res) {
//     res.send('POST Request');
// });

// app.put('/update-data', function (req, res) {
//     res.send('PUT Request');
// });

// app.delete('/delete-data', function (req, res) {
//     res.send('DELETE Request');
// });

const server = app.listen(port, function () {
    console.log(`Node server is running and listening on port ${9000}`);
});