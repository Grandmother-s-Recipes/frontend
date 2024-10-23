import "../styles/loginForm.css";

type loginProps = {
    loginFunction: Function,
}

const Header: React.FC<loginProps> = ({ loginFunction }) => {

    return (
        <>
            <input placeholder="Username"></input>
            <br/>
            <input placeholder="Password"></input>
            <br/>
            <button onClick={() => loginFunction()}>Login</button>
        </>
    )

}

export default Header;