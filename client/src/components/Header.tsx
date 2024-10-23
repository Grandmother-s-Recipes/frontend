import "../styles/header.css";

type headerProps = {
    returnHome: Function,
    loginButtonFunction: Function,
    logoutFunction: Function,
    viewFavorites: Function,
    loggedIn: string,
}

const Header: React.FC<headerProps> = ({ loggedIn, loginButtonFunction, logoutFunction, returnHome, viewFavorites }) => {

    return (
        <>
            <h1><span onClick={() => returnHome()}>Grandmother's Recipes</span></h1>
            <ul>
                {loggedIn === "yes" ? (
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