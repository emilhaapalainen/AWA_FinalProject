import { useState } from 'react';

const ChatInput = ({ user, clickedUser, getUserMessages, getMatchedMessages }) => {

    const [textarea, setTextarea] = useState(null);


    const sendMessage = async () => {
        // const message = {
        //     timestamp: new Date().toISOString(),
        //     from_userId: user?.user_id,
        //     to_userId: clickedUser?.user_id,
        //     message: textArea
        // }
    }

    return (
        <div className="chat-input">
            <textarea value={textarea} onChange={(e) => setTextarea(e.target.value)}/>
            <button className="secondary-button">Send</button>
        </div>
    );
}

export default ChatInput;