import Nav from "../components/Nav";
import AuthModal from "../components/AuthModal";
import { useState } from "react";

const Home = () => {

    const [showModal, setShowModal] = useState(false);
    const [isRegister, setIsRegister] = useState(true);

    const authToken = false;

    const handleClick = () => {
        console.log('Button pressed');
        setShowModal(true);
        setIsRegister(true);
    }
    return (
        <div className="overlay">
            <Nav setShowModal={setShowModal} showModal={showModal} setIsRegister={setIsRegister}/>
            <div className="home">
                <h1 className="primary-title">dateSync</h1>
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'Signout' : 'Create an Account'}
                </button>

                {showModal && (
                    <AuthModal setShowModal={setShowModal} isRegister={isRegister}/>
                )}
            </div>
        </div>
    );
}

export default Home;