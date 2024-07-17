require('dotenv/config')
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const {hash, compare} = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {db} = require('./db.js')

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

app.post('/login',async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = db.find(user => user.email == email)

        if(!user) throw new Error('user not found')
        const pwd = await compare(password,user.password)
        if(!pwd) throw new Error('Password does not match')
        jwt.send({data: 'logged',expriresIn: '2s'},ACCESSTOKENKEY)
        res.send('Logged succefully ')
    }catch(err){
        res.send({
            error: err
        })
    }
})

app.post('/register', async (req,res) => {
    const {email , password , name} = req.body;

    try{
        const user = db.find(user => user.email == email)
        if(user) throw new Error('email exists')
        const hashedPassword = await hash(password,10)
        db.push({
            id: db.length,
            name,
            email,
            password:hashedPassword,
        })
        res.send(JSON.stringify(db))
    }catch(err){
        res.send({
            error: err
        })
    }
})

app.listen(process.env.PORT, () => {
    console.log(`The server is running at ${process.env.PORT}`)
})