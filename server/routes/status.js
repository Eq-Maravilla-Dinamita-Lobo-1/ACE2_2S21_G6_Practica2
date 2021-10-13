const { Router } = require('express');
const router = Router();
require('dotenv').config()

const DB = require('../config/configdb');

router.get('/status', (req, res) => {
    const sql = `select * from status`;
    DB.query(sql, function (error, results) {
        if (error) res.send({ message: error });
        console.log(results);
        res.send(results);
    });
});

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
