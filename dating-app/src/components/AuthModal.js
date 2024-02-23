const AuthModal = ({ setShowModal }) => {

    const handleClick = () => {
        setShowModal(false);
    }

    return (
        <div className="auth-modal">
            <div className="close-button" onClick={handleClick}>🗙</div>
        </div>
    );
}

export default AuthModal;