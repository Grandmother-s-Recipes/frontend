import "../styles/header.css";

type headerProps = {
    returnHome: Function,
    loginButtonFunction: Function,
    handleLoggedInState: Function,
    viewFavorites: Function,
    isLoggedIn: boolean,
}

const Header: React.FC<headerProps> = ({ isLoggedIn, loginButtonFunction, handleLoggedInState, returnHome, viewFavorites }) => {

    const API_URL: string = import.meta.env.VITE_API_URL;

    async function logoutFunction() {
        try {
            // for handling the express token on the server side
            const response = await fetch(`${API_URL}/logout`, {
                method: 'POST',
                credentials: 'include'
            });

            if (!response.ok) {
                console.error("There was an error logging out on the server side");
            }

            handleLoggedInState(false);

        } catch (error) {
            console.error("There was an error:", error);
        }
        
    }

    return (
        <>
            <h1><span id="grandmother" onClick={() => returnHome()}>Grandmother's Recipes</span></h1>
            <ul>
                {isLoggedIn === true ? (
                    <>
                        <li onClick={logoutFunction}>Logout</li>
                        <li onClick={() => returnHome()}>Return to map</li>
                        <li onClick={() => viewFavorites()}>Favorite recipes</li>
                    </>
                ) : (
                    <>
                        <li onClick={() => loginButtonFunction()}>Login</li>
                        <li onClick={() => returnHome()}>Return to map</li>
                    </>
                )}
            </ul>
        </>
    )

}

export default Header;