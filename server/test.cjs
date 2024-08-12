const express = require('express')
var cors = require('cors')
const bodyParser = require("body-parser")
var CryptoJS = require("crypto-js");

var app = express()

app.use(bodyParser.json());
app.use(cors())
const port = 3000

app.post('/login', (req, res) => {
  console.log(req.body);
  const password = req.body.password;
  var bytes  = CryptoJS.AES.decrypt(password, 'secret key 123');
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  console.log(originalText);
  res.json({
    code: 0
  })
})

app.post("/register", (req, res)=>{
    res.json({
        code: 0
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})