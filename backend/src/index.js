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
        const token = jwt.sign({data: 'foobar'},process.env.ACCESSTOKENKEY,{expiresIn: '1h'},(err,token) => {
            if(err) throw new Error(err)
            else console.log(token)
         })
        res.send({message : 'Logged succefully', user:user})
    }catch(err){
        res.send({
            error: err.message
        })
    }
})

const authenticateJWT = (req,res,next) => {
    const authHEADER = req.headers.authorization;
    if(authHEADER) {
        const token = authHEADER.split(' ')[1]

        jwt.verify(token,ACCESSTOKENKEY,(err,user) => {
            if(err) {
                return res.sendStatus(403)
            }

            req.user = user;
            next()
        })
    }else{
        res.sendStatus(401)
    }
}

app.get('/protected',authenticateJWT,(req,res) => {
    res.json({ message: 'This is a protected route', user: req.user });
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
            error: err.message
        })
    }
})

app.listen(process.env.PORT, () => {
    console.log(`The server is running at ${process.env.PORT}`)
})