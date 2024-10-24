import "../styles/loginForm.css";

type loginProps = {
    loginFunction: Function,
    registerFunction: Function,
}

const Header: React.FC<loginProps> = ({ loginFunction, registerFunction }) => {

    return (
        <>
            <input id="usernameEntry" placeholder="Username"></input>
            <br/>
            <input id="passwordEntry" placeholder="Password"></input>
            <br/>
            <button onClick={() => loginFunction()}>Login</button>
            <br/>
            <button onClick={() => registerFunction()}>Register</button>
        </>
    )

}

export default Header;