import logo from '../images/datesync-logo.png';

const Nav = ({ authToken }) => {
    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={logo}/>

            </div>

            {!authToken && <button className="nav-button">Log in</button>}
        </nav>
    );
}

export default Nav;