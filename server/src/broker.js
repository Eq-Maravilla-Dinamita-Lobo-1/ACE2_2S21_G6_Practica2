const mosca = require('mosca');

const broker = new mosca.Server( { http: {
  port: 9000,
  bundle: true,
  static: "./",
}});

broker.on('ready', () => {
    console.log('Broker ready!');
})

broker.on('clientConnected', (client) => {
    console.log('New CLient: ', client.id );
})

broker.on('published', (data) => {
    console.log('Broker on published:', data.payload.toString());
})

