import logo from '../images/datesync-logo.png';

const Nav = ({ authToken, minimal, setShowModal, showModal, setIsRegister }) => {

    const handleClick = () => {
        setShowModal(true);
        setIsRegister(false);
    }

    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={logo}/>

            </div>

            {!authToken && !minimal && <button 
            className="nav-button"
            onClick={handleClick}
            disabled={showModal}
            >Log in</button>}
        </nav>
    );
}

export default Nav;