import React,{useState} from 'react'
import axios from 'axios'

function Register(props){
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [respo,setRespo] = useState([])
    
    const HandleName = (e) => {
        setName(e.target.value)
    }

    const HandleEmail = (e) => {
        setEmail(e.target.value)
    }

    const HandlePassword = (e) => {
        setPassword(e.target.value)
    }

    const HandleReset = (e) => {
        e.preventDefault()

        setName('')
        setPassword('')
        setEmail('')
    }

    const HandleRewind = () => {
        props.setInMain(true)
    }

    const HandleSubmit = (e) => {
        e.preventDefault()
        const information = {
            email : email,
            name : name,
            password: password
        }
        axios.post('http://localhost:5000/register',information)
        .then((Response) => {
            console.log(Response)
            setRespo(Response.data)
        })
        .catch(Response => console.log(Response))
        props.setInMain(true)
    }

    return(
        <main>
            <p className="rd" onClick={HandleRewind}>Rewind</p>
            <h1>Register</h1>
            <form onSubmit={HandleSubmit}>
                <label>Name</label>
                <input type="text" value={name} onChange={(e)=>HandleName(e)} placeholder="Enter your name"/>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => HandleEmail(e)} placeholder="Enter your email"/>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => HandlePassword(e)} placeholder="*************"/>
                <button>
                    Submit
                </button>
                <button onClick={HandleReset}>
                    Reset
                </button>
            </form>
            <p className='error'>{ !(respo.error)? '' : respo.error }</p>
        </main>
    )

}

export default Register