//
//Puerto
//
process.env.PORT = process.env.PORT || 3000;

//
//Entorno
//

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//BASE DE DATOS
//

let urlDB;

if (process.env.NODE_ENV === 'dev')
    urlDB = 'mongodb://localhost:27017/cafe';
else
    urlDB = 'mongodb://cafe-user:BC123456789@ds239047.mlab.com:39047/cafe';

process.env.URLDB = urlDB;