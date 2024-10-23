import "../styles/header.css";

type headerProps = {
    returnHome: Function,
    loginFunction: Function,
    logoutFunction: Function,
    viewFavorites: Function,
    loggedIn: string,
}

const Header: React.FC<headerProps> = ({ loggedIn, loginFunction, logoutFunction, returnHome, viewFavorites }) => {

    return (
        <>
            <h1>Grandmother's Recipes</h1>
            <ul>
                {loggedIn === "yes" ? (
                    <>
                        <li onClick={() => logoutFunction()}>Logout</li>
                        <li onClick={() => returnHome()}>Return to map</li>
                        <li onClick={() => viewFavorites()}>Favorite recipes</li>
                    </>
                ) : (
                    <>
                        <li onClick={() => loginFunction()}>Login</li>
                        <li onClick={() => returnHome()}>Return to map</li>
                    </>
                )}
            </ul>
        </>
    )

}

export default Header;