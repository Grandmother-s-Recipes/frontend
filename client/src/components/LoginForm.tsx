import React, {useState} from 'react';
import "../styles/loginForm.css";

type loginProps = {
    handleLoggedInState: Function,
}

const LoginForm: React.FC<loginProps> = ({ handleLoggedInState }) => {

    const [loginError, setLoginError] = useState<boolean>(false);

    async function loginFunction() {
        const username = (document.getElementById("usernameEntry") as HTMLInputElement).value;
        const password = (document.getElementById("passwordEntry") as HTMLInputElement).value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if(response.ok) {
                const data = await response.json();
                localStorage.setItem('authToken', data.token); // Set the session locally here.
                handleLoggedInState(true);
            } else {
                console.error('Login failed!');
            }
        } catch (error) {
            setLoginError(true);
        }
    }

    async function registerFunction() {
        const username = (document.getElementById("usernameEntry") as HTMLInputElement).value;
        const password = (document.getElementById("passwordEntry") as HTMLInputElement).value;
        
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if(response.ok) {
                const data = await response.json();
                localStorage.setItem('authToken', data.token);
                handleLoggedInState(true);
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            setLoginError(true);
        }
        
    }

    return (
        <>
            {
                loginError ? (
                    <h3>Error</h3>
                    <p>It seems there was an error with login or registration.</p>
                    <p>Sorry about that</p>
                ) : (
                    <input id="usernameEntry" placeholder="Username"></input>
                    <br/>
                    <input id="passwordEntry" placeholder="Password"></input>
                    <br/>
                    <button onClick={loginFunction}>Login</button>
                    <br/>
                    <button onClick={registerFunction}>Register</button>
                )
            }
            
        </>
    )

}

export default LoginForm;