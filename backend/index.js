const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const routes = require('./config/routes');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors());
app.use(routes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`API executando em http://localhost:${PORT}/`)
});