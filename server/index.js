const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config()

const PORT = process.env.PORT_JS || 3000;
const app = express();

//config
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//user
const status = require('./routes/status')
app.use(status);

app.get("/", (req, res) => {
    res.send("Server is runing!");
});

/*sever up*/
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
