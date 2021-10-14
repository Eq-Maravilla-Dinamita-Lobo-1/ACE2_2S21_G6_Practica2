const { Router } = require('express');
const router = Router();
require('dotenv').config()

const DB = require('../config/configdb');

router.get('/actualStatus', (req, res) => {
    const sql = `call actualStatus();`;
    DB.query(sql, function(error, results) {
        if (error) return res.send({ message: error });
        res.send(results[0]);
    });
});

router.get('/today/:filter/:value', (req, res) => {
    let param = req.params.value
    let filter = req.params.filter
    let sql = ''
    if (param === 'winddirection') {
        sql = `select st.winddirection as direction,count(st.winddirection) as cont  from status st
        where dayofyear(st.date_time) = dayofyear(date_add(now(), interval -6 HOUR ))
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by direction order by direction;`
    } else if (filter === 'max') {
        sql = `select max(st.${param}) as max, hour(st.date_time) as hour from status st
        where dayofyear(st.date_time) = dayofyear(date_add(now(), interval -6 HOUR ))
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by hour(st.date_time) order by hour;`
    } else if (filter === 'min') {
        sql = `select min(st.${param}) as min, hour(st.date_time) as hour from status st
        where dayofyear(st.date_time) = dayofyear(date_add(now(), interval -6 HOUR ))
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by hour(st.date_time) order by hour;`
    } else if (filter === 'avg') {
        sql = `select round(avg(st.${param}),2) as avg, hour(st.date_time) as hour from status st
        where dayofyear(st.date_time) = dayofyear(date_add(now(), interval -6 HOUR ))
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by hour(st.date_time) order by hour;`
    } else return res.send({ message: 'bad request' })
    DB.query(sql, function(error, results) {
        if (error) return res.send({ message: error });
        res.send(results);
    });
})

router.get('/yesterday/:filter/:value', (req, res) => {
    let param = req.params.value
    let filter = req.params.filter
    let sql = ''
    if (param === 'winddirection') {
        sql = `
        select st.winddirection as direction,count(st.winddirection) as cont  from status st
        where dayofyear(st.date_time) = dayofyear(date_add(now(), interval -6 HOUR ))-1
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by direction order by direction;`
    } else if (filter === 'max') {
        sql = `select max(st.${param}) as max, hour(st.date_time) as hour from status st
        where dayofyear(st.date_time) = dayofyear(date_add(now(), interval -6 HOUR ))-1
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by hour(st.date_time) order by hour;`
    } else if (filter === 'min') {
        sql = `select min(st.${param}) as min, hour(st.date_time) as hour from status st
        where dayofyear(st.date_time) = dayofyear(date_add(now(), interval -6 HOUR ))-1
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by hour(st.date_time) order by hour;`
    } else if (filter === 'avg') {
        sql = `select round(avg(st.${param}),2) as avg, hour(st.date_time) as hour from status st
        where dayofyear(st.date_time) = dayofyear(date_add(now(), interval -6 HOUR ))-1
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by hour(st.date_time) order by hour;`
    } else return res.send({ message: 'bad request' })
    DB.query(sql, function(error, results) {
        if (error) res.send({ message: error });
        res.send(results);
    });
})

router.get('/week/:filter/:value', (req, res) => {
    let param = req.params.value
    let filter = req.params.filter
    let sql = ''
    if (param === 'winddirection') {
        sql = `select st.winddirection as direction,count(st.winddirection) as cont  from status st
        where weekofyear(st.date_time) = weekofyear(date_add(now(), interval -6 HOUR ))
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by direction order by direction;`
    } else if (filter === 'max') {
        sql = `select max(st.${param}) as max, dayofweek(st.date_time) as day from status st
        where weekofyear(st.date_time) = weekofyear(date_add(now(), interval -6 HOUR ))
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by dayofweek(st.date_time) order by day;`
    } else if (filter === 'min') {
        sql = `select min(st.${param}) as min, dayofweek(st.date_time) as day from status st
        where weekofyear(st.date_time) = weekofyear(date_add(now(), interval -6 HOUR ))
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by dayofweek(st.date_time) order by day;`
    } else if (filter === 'avg') {
        sql = `select round(avg(st.${param}),2) as avg, dayofweek(st.date_time) as day from status st
        where weekofyear(st.date_time) = weekofyear(date_add(now(), interval -6 HOUR ))
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by dayofweek(st.date_time) order by day;`
    } else return res.send({ message: 'bad request' })
    DB.query(sql, function(error, results) {
        if (error) return res.send({ message: error });
        res.send(results);
    });
})

router.get('/lastweek/:filter/:value', (req, res) => {
    let param = req.params.value
    let filter = req.params.filter
    let sql = ''
    if (param === 'winddirection') {
        sql = `select st.winddirection as direction,count(st.winddirection) as cont  from status st
        where weekofyear(st.date_time) = weekofyear(date_add(now(), interval -6 HOUR ))-1
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by direction order by direction;`
    } else if (filter === 'max') {
        sql = `select max(st.${param}) as max, dayofweek(st.date_time) as day from status st
        where weekofyear(st.date_time) = weekofyear(date_add(now(), interval -6 HOUR ))-1
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by dayofweek(st.date_time) order by day;`
    } else if (filter === 'min') {
        sql = `select min(st.${param}) as min, dayofweek(st.date_time) as day from status st
        where weekofyear(st.date_time) = weekofyear(date_add(now(), interval -6 HOUR ))-1
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by dayofweek(st.date_time) order by day;`
    } else if (filter === 'avg') {
        sql = `select round(avg(st.${param}),2) as avg, dayofweek(st.date_time) as day from status st
        where weekofyear(st.date_time) = weekofyear(date_add(now(), interval -6 HOUR ))-1
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by dayofweek(st.date_time) order by day;`
    } else return res.send({ message: 'bad request' })
    DB.query(sql, function(error, results) {
        if (error) return res.send({ message: error });
        res.send(results);
    });
})

router.get('/month/:filter/:value', (req, res) => {
    let param = req.params.value
    let filter = req.params.filter
    let sql = ''
    if (param === 'winddirection') {
        sql = `select st.winddirection as direction,count(st.winddirection) as cont  from status st
        where month(st.date_time) = month(date_add(now(), interval -6 HOUR ))
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by direction order by direction;`
    } else if (filter === 'max') {
        sql = `select max(st.${param}) as max, day(st.date_time) as day from status st
        where month(st.date_time) = month(date_add(now(), interval -6 HOUR ))
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by day(st.date_time) order by day;`
    } else if (filter === 'min') {
        sql = `select min(st.${param}) as min, day(st.date_time) as day from status st
        where month(st.date_time) = month(date_add(now(), interval -6 HOUR ))
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by day(st.date_time) order by day;`
    } else if (filter === 'avg') {
        sql = `select round(avg(st.${param}),2) as avg, day(st.date_time) as day from status st
        where month(st.date_time) = month(date_add(now(), interval -6 HOUR ))
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by day(st.date_time) order by day;`
    } else return res.send({ message: 'bad request' })
    DB.query(sql, function(error, results) {
        if (error) return res.send({ message: error });
        res.send(results);
    });
})

router.get('/lastmonth/:filter/:value', (req, res) => {
    let param = req.params.value
    let filter = req.params.filter
    let sql = ''
    if (param === 'winddirection') {
        sql = `select st.winddirection as direction,count(st.winddirection) as cont  from status st
        where month(st.date_time) = month(date_add(now(), interval -6 HOUR ))-1
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by direction order by direction;`
    } else if (filter === 'max') {
        sql = `select max(st.${param}) as max, day(st.date_time) as day from status st
        where month(st.date_time) = month(date_add(now(), interval -6 HOUR ))-1
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by day(st.date_time) order by day;`
    } else if (filter === 'min') {
        sql = `select min(st.${param}) as min, day(st.date_time) as day from status st
        where month(st.date_time) = month(date_add(now(), interval -6 HOUR ))-1
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by day(st.date_time) order by day;`
    } else if (filter === 'avg') {
        sql = `select round(avg(st.${param}),2) as avg, day(st.date_time) as day from status st
        where month(st.date_time) = month(date_add(now(), interval -6 HOUR ))-1
        and year(st.date_time) = year(date_add(now(), interval -6 HOUR ))
        group by day(st.date_time) order by day;`
    } else return res.send({ message: 'bad request' })
    DB.query(sql, function(error, results) {
        if (error) return res.send({ message: error });
        res.send(results);
    });
})


module.exports = router