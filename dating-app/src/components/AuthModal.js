import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AuthModal = ({ setShowModal, isRegister }) => {

    const [ email, setEmail ] = useState(null);
    const [ password, setPw ] = useState(null);
    const [ checkpw, setCheckPw ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ cookies, setCookie, removeCookie ] = useCookies(['user']);

    let navigate = useNavigate();
    

    const handleClick = () => {
        setShowModal(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegister && password !== checkpw) {
                setError('Passwords do not match');
            } else {
                const response = await axios.post(`http://localhost:8000/${isRegister ? 'register' : 'login'}`, { email, password });

                setCookie("Email", response.data.email);
                setCookie("UserId", response.data.user_id);
                setCookie("AuthToken", response.data.token);

                const success = response.status === 201;
                if (success && isRegister) {
                    navigate("/welcome");
                } 
                if (success && !isRegister) {
                    navigate("/dashboard");
                }
            }

        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="auth-modal">
            <div className="close-button" onClick={handleClick}>🗙</div>
            <h2>{isRegister ? 'Create an Account' : "Log in"}</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    required={true}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required={true}
                    onChange={e => setPw(e.target.value)}
                />
                {isRegister && <input 
                    type="password"
                    id="check-password"
                    name="check-password"
                    placeholder="re-type password"
                    required={true}
                    onChange={e => setCheckPw(e.target.value)}
                />}
                <input className="secondary-button" type="submit"/>
                <p>{error}</p>

            </form>
            <hr/>
        </div>
    );
}

export default AuthModal;