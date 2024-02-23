import logo from '../images/datesync-logo.png';

const Nav = ({ minimal, setShowModal, showModal, setIsRegister }) => {

    const handleClick = () => {
        setShowModal(true);
        setIsRegister(false);
    }

    const authToken = false;

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