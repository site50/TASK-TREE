const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db=require('./queryTask')
const port = 3005
const cors = require('cors');

let corsOpltions = { origin: ['http://localhost:5173'] }

app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, Authorization");
  res.header({ 'Content-Type': 'application/json', Authorization: 'my-auth-token' })
  res.header("Access-Control-Allow-Credentials:true");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
  next();
});

app.get('/data', db.getTask)
app.get('/data/:id', db.getTaskId)
app.post('/post', db.createTask)

app.put('/delete/:id', db.deleteTask)

 app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
