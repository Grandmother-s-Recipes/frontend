import React, {useState} from 'react';
import "../styles/loginForm.css";

type loginProps = {
    handleLoggedInState: Function,
}

const LoginForm: React.FC<loginProps> = ({ handleLoggedInState }) => {

    const [loginError, setLoginError] = useState<boolean>(false);
    const [loginFailed, setLoginFailed] = useState<boolean>(false);
    const API_URL: string = import.meta.env.VITE_API_URL;

    async function loginFunction() {
        const username = (document.getElementById("usernameEntry") as HTMLInputElement).value;
        const password = (document.getElementById("passwordEntry") as HTMLInputElement).value;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if(response.ok) {
                //const data = await response.json();
                handleLoggedInState(true);
            } else {
                console.error('Login failed!');
                setLoginFailed(true);
            }
        } catch (error) {
            setLoginError(true);
        }
    }

    async function registerFunction() {
        const username = (document.getElementById("usernameEntry") as HTMLInputElement).value;
        const password = (document.getElementById("passwordEntry") as HTMLInputElement).value;
        
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                //const data = await response.json();
                handleLoggedInState(true);
            } else {
                setLoginFailed(true);
                console.error('Registration failed');
            }
        } catch (error) {
            setLoginError(true);
        }
    }

    function returnToLogin() {
        setLoginError(false);
        setLoginFailed(false);
    }

    return (
        <>
            {
                loginError ? (
                    <>
                        <h3>Error</h3>
                        <p>It seems there was an error with login or registration.</p>
                        <p>Sorry about that</p>
                        <button onClick={returnToLogin}>Return to Login</button>
                    </>
                ) : (
                    <>
                        <input id="usernameEntry" placeholder="Username"></input>
                        <br/>
                        <input id="passwordEntry" placeholder="Password"></input>
                        <br/>
                        <button onClick={loginFunction}>Login</button>
                        <br/>
                        <button onClick={registerFunction}>Register</button>
                    </>
                )
            }

            {
                loginFailed ? (
                    <>
                        <h3>Login / Registration could not be completed</h3>
                        <p>Sorry about that. Please try again</p>
                    </>
                ) : (
                    <>
                    </>
                )
            }
            
        </>
    )

}

export default LoginForm;