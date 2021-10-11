const mqtt = riquier('mqtt');
const serialPort = require("serialport");
// const readLine = require("@serialport/parser-readline");

const publisher = mqtt.connect('mqtt://test.mosquitto.org');


const usb_port = 'COM3';
const bauds = 9600;

const port = new serialPort(usb_port, { baudRate: bauds });
const parser = port.pipe(new serialPort.parsers.Readline({ delimiter: "\n" }));


const onConnect = () =>{
    parser.on('data', (data) => {
        console.log(data);
        publisher.publish("ACYE2_G6/data", data);   
    });
}

port.on('open', () => { console.log("Se abrió la comunicación"); });
publisher.on('connect', onConnect);