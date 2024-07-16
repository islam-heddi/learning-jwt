require('dotenv/config')
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const {hash, compare} = require('bcryptjs')
const {verify} = require('jsonwebtoken')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/',(req,res) => {
    res.send("Hello World")
})

app.listen(process.env.PORT, () => {
    console.log(`The server is running at ${process.env.PORT}`)
})