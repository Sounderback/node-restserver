require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


//const hbs = require('hbs');
//require('./hbs/helpers');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Cadena de conexion
//const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json('Hola Mundo');
})

app.get('/usuario', (req, res) => {
    res.json('get Usuario');
})

app.post('/usuario', (req, res) => {
    //res.json('post Usuario');
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json({
            persona: body
        });
    }

})

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    //res.json('put Usuario');
    res.json({
        id
    });
})

app.delete('/usuario', (req, res) => {
    res.json('delete Usuario');
})




app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto: ${process.env.PORT}`);
});