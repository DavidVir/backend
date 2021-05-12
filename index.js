const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { dbConnection } = require('./database/config');


dotenv.config();

const app = express();

// base de datos

dbConnection();

// cors
//app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



// directorio publico
app.use( express.static('public'));

// parceo del body
app.use(express.json() );


// rutas de la aplicacion 
app.use('/api/proveedores' , require('./routes/proveedor') );
app.use('/api/evaluador' , require('./routes/evaluador') );
app.use('/api/criterios' , require('./routes/criterios') );
app.use('/api/evaluaciones' , require('./routes/evaluaciones') );


app.listen( process.env.PORT, ()=> {
    console.log('servidor corriendo en el puerto ' + process.env.PORT  );
})