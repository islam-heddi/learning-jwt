import Register from "./Register";
import Login from "./Login"
import React,{useState} from 'react'

function App() {
  const [action,setAction] = useState('Register')
  const [inMain,setInMain] = useState(true)

  const HandleLogin = () => {
    setAction('Login')
    setInMain(false)
  }

  const HandleRegister = () => {
    setAction('Register')
    setInMain(false)
  }

  const home = <div>
    <p>Please perform an action</p>
    <button onClick={HandleLogin}>Login</button>
    <button onClick={HandleRegister}>Register</button>

  </div>

  return (
    inMain ? home : (action == 'Register'? <Register setInMain={setInMain}/> : <Login setInMain={setInMain}/>)
  )
}

export default App
