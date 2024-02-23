import { useState } from "react";

const AuthModal = ({ setShowModal }) => {

    const [ email, setEmail ] = useState(null);
    const [ password, setPw ] = useState(null);
    const [ checkpw, setCheckPw ] = useState(null);
    const [ error, setError ] = useState(null);
    
    const isRegister = true;

    const handleClick = () => {
        setShowModal(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (isRegister && password !== checkpw) {
                setError('Passwords do not match');
            } console.log('TODO: send post request to create account');
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