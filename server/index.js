const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config()

const PORT = process.env.PORT_JS || 3100;
const app = express();

//config
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is runing!");
});

//status
const status = require('./routes/status')
app.use(status);

//data
const data = require('./src/subcribe')
app.use(data);

/*sever up*/
const server = app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);

module.exports = server;