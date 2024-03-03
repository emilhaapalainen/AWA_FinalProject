import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ChatHeader = ({ user }) => {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    let navigate = useNavigate();

    // Clear cookies and go back to login page
    const logout = () => {
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        navigate("/")
    }

    return (
        <div className="chat-container-header">
            <div className="profile">
                <div className="img-container">
                    <img src={user.url} alt={"Profile picture for " + user.first_name}/>
                </div>
                <h3>{user.first_name}</h3>
            </div>
            <i className="logout-icon" onClick={logout}>&#10157</i>
        </div>
    );
}

export default ChatHeader;