import React,{useState} from 'react'
import axios from 'axios'

function Login(props){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [data,setData] = useState([])
    const [isInprofile,setIsInprofile] = useState(false)

    const HandleEmail = (e) => {
        setEmail(e.target.value)
    }

    const HandlePassword = (e) => {
        setPassword(e.target.value)
    }

    const HandleReset = () => {
        setEmail('')
        setPassword('')
    }

    const HandleSubmit = (e) => {
        e.preventDefault()
        const information = {
            email: email,
            password: password
        }
        axios.post('http://localhost:5000/login',information)
        .then((Response) => {
            console.log(Response)
            setData(Response.data)
            if(!data.message){
                setIsInprofile(true)
            }
        })
        .catch(
            (Response) =>  console.log(Response)
        )
    }

    const HandleRewind = () => {
        props.setInMain(true)
    }

    const profile = <div>
        <h1>Congratulation. You've entered successfully</h1>
        <p>The name : {data.user.name}</p>
        <p>The email : {data.user.email}</p>
        <p>The id : {data.user.id}</p> 
    </div>

    const login = <>
            <p className="rd" onClick={HandleRewind}>Rewind</p>
            <h1>Login</h1>
            <form onSubmit={HandleSubmit}>
                <label>
                    Email
                </label>
                <input type="email" value={email} onChange={(e) => HandleEmail(e)} placeholder="Enter your email"/>
                <label>
                    Password
                </label>
                <input type="password" value={password} onChange={(e) => HandlePassword(e)} placeholder="*************" />
                <button>
                    Submit
                </button>
            </form>
                <button onClick={HandleReset}>
                    Reset
                </button>
            <p className='error'>{!(data.error)? '':data.error}</p>
    
    </>

    return(
        <main>
            {(isInprofile)? profile : login}
        </main>
    )
}

export default Login