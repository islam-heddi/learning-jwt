require('dotenv/config')
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const {hash, compare} = require('bcryptjs')
const {verify} = require('jsonwebtoken')

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/',(req,res) => {
    res.send("Hello World")
})

app.post('/login',(req,res) => {

})

app.post('/register',(req,res) => {
    
})

app.listen(process.env.PORT, () => {
    console.log(`The server is running at ${process.env.PORT}`)
})