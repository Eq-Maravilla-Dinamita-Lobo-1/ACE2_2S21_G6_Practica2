const mqtt = require('mqtt')
const sub = mqtt.connect("mqtt://test.mosquitto.org");

const onMessage = (topic, message) =>{
    console.log(topic, " ", message.toString());
}

sub.on('connect', () => { sub.subscribe("ACYE2_G6/data"); });
// sub.on('connect', () => { sub.subscribe("/#"); });
sub.on('message', onMessage);