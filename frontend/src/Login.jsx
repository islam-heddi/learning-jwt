
function Login(props){

    const HandleRewind = () => {
        props.setInMain(true)
    }

    return(
        <main>
            <p className="rd" onClick={HandleRewind}>Rewind</p>
            <h1>Login</h1>
            <form>
                <label>
                    Email
                </label>
                <input type="email" placeholder="Enter your email"/>
                <label>
                    Password
                </label>
                <input type="password" placeholder="*************" />
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

export default Login