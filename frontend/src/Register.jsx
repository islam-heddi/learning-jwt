
function Register(props){

    const HandleRewind = () => {
        props.setInMain(true)
    }

    return(
        <main>
            <p className="rd" onClick={HandleRewind}>Rewind</p>
            <h1>Register</h1>
            <form>
                <label>Name</label>
                <input type="text" placeholder="Enter your name"/>
                <label>Email</label>
                <input type="email" placeholder="Enter your email"/>
                <label>Password</label>
                <input type="password" placeholder="*************"/>
                <button>
                    Submit
                </button>
                <button type="reset">
                    Reset
                </button>
            </form>
        </main>
    )

}

export default Register