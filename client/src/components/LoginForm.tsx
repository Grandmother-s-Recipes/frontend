import React, {useState} from 'react';
import "../styles/loginForm.css";

type loginProps = {
    handleLoggedInState: (loggedIn: boolean) => void,
}

const LoginForm: React.FC<loginProps> = ({ handleLoggedInState }) => {

    const [loginError, setLoginError] = useState<boolean>(false);
    const [loginFailed, setLoginFailed] = useState<boolean>(false);
    const [loginOrRegister, setLoginOrRegister] = useState<string>('login');
    const URL: string = import.meta.env.VITE_API_URL;

    async function loginFunction() {
        const username = (document.getElementById("usernameEntry") as HTMLInputElement).value;
        const password = (document.getElementById("passwordEntry") as HTMLInputElement).value;

        try {
            const response = await fetch(`${URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });

            if(response.ok) {
                const data = await response.json();
                sessionStorage.setItem('user_id', data.user_id);
                handleLoggedInState(true);
            } else {
                console.error('Login failed!');
                setLoginFailed(true);
            }
        } catch {
            setLoginError(true);
        }
    }

    async function registerFunction() {
        const username = (document.getElementById("usernameRegister") as HTMLInputElement).value;
        const password = (document.getElementById("passwordRegister") as HTMLInputElement).value;
        const confirmPassword = (document.getElementById("confirmPasswordRegister") as HTMLInputElement).value;

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            const response = await fetch(`${URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });

            if (response.ok) {
                setLoginOrRegister('login');
            } else {
                setLoginFailed(true);
                console.error('Registration failed');
            }
        } catch {
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
                ) : loginOrRegister === 'login' ? (
                    <div className="loginForm">
                        <input id="usernameEntry" placeholder="Username" type="text"></input>
                        <br/>
                        <input id="passwordEntry" placeholder="Password" type="password"></input>
                        <br/>
                        <div className="buttonGroup">
                            <button onClick={loginFunction}>Login</button>
                            <br/>
                            <button onClick={() => setLoginOrRegister('register')}>Register?</button>
                        </div>
                    </div>
                ) : ( //loginOrRegister = 'register'
                    <div className="loginForm">
                        <input id="usernameRegister" placeholder="Username" type="text"></input>
                        <br/>
                        <input id="passwordRegister" placeholder="Password" type="password"></input>
                        <br/>
                        <input id="confirmPasswordRegister" placeholder="Confirm Password" type="password"></input>
                        <br/>
                        <div className="buttonGroup">
                            <button onClick={registerFunction}>Register</button>
                            <br/>
                            <button onClick={() => setLoginOrRegister('login')}>Back to login?</button>
                        </div>
                    </div>
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