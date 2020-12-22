const express = require("express");
const fs = require("fs");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;
const HOST = '127.0.0.1'

const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-form', (req, res) => {

  const p = req.body;
  console.log('--> Your payload:', JSON.stringify(p));
  fs.appendFileSync("response.txt", JSON.stringify(p));
  res.sendStatus(200);
})

app.get("/get-files", (req, res) => {
  const file = fs.readFileSync("./src/db.json");
  const result = JSON.parse(file);
  res.send(result)
})

app.listen(PORT, HOST, () => console.log(`Server is running at http://${HOST}:${PORT}`));