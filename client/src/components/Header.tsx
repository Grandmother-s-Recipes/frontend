import "../styles/header.css";

type headerProps = {
    returnHome: Function,
    loginButtonFunction: Function,
    logoutFunction: Function,
    viewFavorites: Function,
    isLoggedIn: boolean,
}

const Header: React.FC<headerProps> = ({ isLoggedIn, loginButtonFunction, logoutFunction, returnHome, viewFavorites }) => {

    return (
        <>
            <h1><span id="grandmother" onClick={() => returnHome()}>Grandmother's Recipes</span></h1>
            <ul>
                {isLoggedIn === true ? (
                    <>
                        <li onClick={() => logoutFunction()}>Logout</li>
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