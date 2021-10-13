const { Router } = require('express');
const router = Router();
require('dotenv').config()

const DB = require('../config/configdb');

router.get('/actualStatus', (req, res) => {
    const sql = `select * from status order by date_time desc limit 1`;
    DB.query(sql, function(error, results) {
        if (error) res.send({ message: error });
        res.send(results);
    });
});

//ToDo 
//media del dia actual
//mayor
//menor
//media

//todos los registros del dia actual
//mayor
//menor
//media

//Todos los registros del dia anterior
//mayor
//menor
//media

//Todos los registros de la semana, promedio del dia
//mayor
//menor
//media

//Todos los registros de la semana pasada, promedio del dia
//mayor
//menor
//media

//Todos los registros del mes actual, promedio de dias
//mayor
//menor
//media

//Todos los registros del mes anterior, promedio de dias
//mayor
//menor
//media




/* router.post('/newUser', (req, res) => {
    no_cuenta = req.body.no_cuenta
    const sql = `insert into usuario values (${no_cuenta},'${nombre}','${apellido}',${dpi},${saldo},'${correo}','${contra}')`;
    DB.query(sql, function (error, results) {
        if (error) {
            console.log(error);
            res.send({ message: error.sqlMessage });
        } else {
            console.log(results);
            res.send({ message: 'insertated' });
        }
    });
}); */


module.exports = router