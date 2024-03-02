import { useState, useEffect } from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import axios from "axios";

const ChatDisplay = ({ user, clickedUser }) => {
    
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id

    const [usersMessages, setUsersMessages] = useState(null)
    const [clickedUserMessages, setClickedUserMessages] = useState(null)

    const getMessages = async (fromId, toId) => {
        try {
            const response = await axios.get("http://localhost:8000/messages", {
            params: {userId: fromId, correspondingUserId: toId}
        })
        return response.data
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        setUsersMessages(getMessages(userId, clickedUserId))
        setClickedUserMessages(getMessages(clickedUserId, userId))
    }, [usersMessages, clickedUserMessages])

    const messages = []

    usersMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = user?.first_name
        formattedMessage['img'] = user?.url
        formattedMessage['message'] = message?.message
        formattedMessage['timestamp'] = message?.timestamp
        messages.push(formattedMessage)
    });

    return (
        <>
        <Chat/>
        <ChatInput/>
        </>
    );
}

export default ChatDisplay;