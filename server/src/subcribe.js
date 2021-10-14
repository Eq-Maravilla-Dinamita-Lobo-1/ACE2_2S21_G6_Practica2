const mqtt = require('mqtt')
const sub = mqtt.connect("wss://my-broker-acye2.herokuapp.com");
const DB = require('../config/configdb');

const onMessage = (topic, message) => {
    if (message.toString().includes('temperature')) {
        let data = JSON.parse(message.toString())
        const sql = `
        INSERT INTO status 
            (temperature, temperaturef, humidity, windspeed, winddirection, brightness, date_time) 
        VALUES 
            (${data.temperature}, ${data.temperatureF}, ${data.humidity}, ${data.windSpeed}, \"${data.windDirection}\", ${data.Luminocidad}, date_add(now(), interval -6 HOUR ))`;
        DB.query(sql, function(error, results) {
            if (error) console.log(error);
            console.log('Id ', results.insertId, ' inserted')
        });
    } else return
}

sub.on('connect', () => { sub.subscribe("ACYE2_G6/data"); });
sub.on('message', onMessage);

module.exports = onMessage