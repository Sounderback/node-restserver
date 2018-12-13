const express = require('express');

const _ = require('underscore');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const app = express();

app.get('/', (req, res) => {
    res.json('Hola Mundo');
})

app.get('/usuario', (req, res) => {
    let condiciones = {
        estado: false
    }
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 1;
    limite = Number(limite);
    Usuario.find(condiciones, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) return res.status(400).json({
                ok: false,
                err
            });

            Usuario.countDocuments(condiciones, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    conteo
                });
            });


        });

    //res.json('get Usuario');
})

app.post('/usuario', (req, res) => {
    //res.json('post Usuario');
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

    // if (body.nombre === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         mensaje: 'El nombre es necesario'
    //     });
    // } else {
    //     res.json({
    //         persona: body
    //     });
    // }

})

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    //let body = req.body;
    let body = _.pick(req.body, ['nombre', 'email', 'Image', 'role', 'estado']);


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
            //findById()
            //usuarioDB.save();
            if (err) return res.status(400).json({
                ok: false,
                err
            });
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        })
        //res.json('put Usuario');

})

app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    //ELIMINACION
    // Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {
    //     if (err) return res.status(400).json({
    //         ok: false,
    //         err
    //     });

    //     if (!usuarioBorrado) return res.status(400).json({
    //         ok: false,
    //         err: {
    //             message: 'Usuario no encontrado'
    //         }
    //     });
    // res.json({
    //     ok: true,
    //     usuario: usuarioBorrado
    // });
    // })
    let cambiaEstado = {
        estado: false
    };
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        //findById()
        //usuarioDB.save();
        if (err) return res.status(400).json({
            ok: false,
            err
        });
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    })




    //res.json('delete Usuario');
})

module.exports = app;