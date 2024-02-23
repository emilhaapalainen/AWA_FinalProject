import logo from '../images/datesync-logo.png';

const Nav = ({ authToken, setShowModal, showModal }) => {

    const handleClick = () => {
        setShowModal(true);
    }

    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={logo}/>

            </div>

            {!authToken && <button 
            className="nav-button"
            onClick={handleClick}
            disabled={showModal}
            >Log in</button>}
        </nav>
    );
}

export default Nav;