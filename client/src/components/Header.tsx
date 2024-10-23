import "../styles/header.css";

type headerProps = {
    returnHome: Function,
}

const Header: React.FC<headerProps> = ({ returnHome }) => {

    return (
        <h1 onClick={() => returnHome()}>header bar</h1>
    )

}

export default Header;