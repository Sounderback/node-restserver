require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//const hbs = require('hbs');
//require('./hbs/helpers');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Cadena de conexion
//const port = process.env.PORT || 3000;

app.use(require('./routes/usuario'));

mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    //{ useNewUrlParser: true };
    console.log('Base de datos online');
});


app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto: ${process.env.PORT}`);
});