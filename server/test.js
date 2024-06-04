const express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())
const port = 3000

app.post('/login', (req, res) => {
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