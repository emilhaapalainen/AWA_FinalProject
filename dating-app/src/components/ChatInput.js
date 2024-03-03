import axios from 'axios';
import { useState } from 'react';

const ChatInput = ({ user, clickedUser, getUserMessages, getMatchedMessages }) => {

    const [textArea, setTextarea] = useState("");


    const sendMessage = async () => {
        const message = {
            timestamp: new Date().toISOString(),
            from_userId: user?.user_id,
            to_userId: clickedUser?.user_id,
            message: textArea
        }

        try {
            await axios.post("http://localhost:8000/message", { message })
            getUserMessages()
            getMatchedMessages()
            setTextarea("")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="chat-input">
            <textarea value={textArea} onChange={(e) => setTextarea(e.target.value)}/>
            <button className="secondary-button" onClick={sendMessage}>Send</button>
        </div>
    );
}

export default ChatInput;