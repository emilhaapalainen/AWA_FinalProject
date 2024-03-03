import Nav from "../components/Nav";
import AuthModal from "../components/AuthModal";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const [showModal, setShowModal] = useState(false);
    const [isRegister, setIsRegister] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    let navigate = useNavigate();

    const authToken = cookies.AuthToken;

    const handleClick = () => {
        if (authToken) {
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return 
        }
        setShowModal(true);
        setIsRegister(true);
    }

    // If the user is logged in, main page redirects to dashboard
    useEffect(() => {
        if (authToken) {
            navigate("/dashboard");
        }
    }, [authToken, navigate])

    return (
        <div className="overlay">
            <Nav authToken={authToken} setShowModal={setShowModal} showModal={showModal} setIsRegister={setIsRegister}/>
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