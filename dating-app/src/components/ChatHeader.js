import { useCookies } from 'react-cookie';

const ChatHeader = ({ user }) => {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const logout = () => {
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        window.location.reload()
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