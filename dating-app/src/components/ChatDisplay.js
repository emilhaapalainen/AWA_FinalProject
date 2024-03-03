import { useState, useEffect } from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import axios from "axios";

const ChatDisplay = ({ user, clickedUser }) => {
    
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id

    const [usersMessages, setUsersMessages] = useState(null)
    const [MatchedUserMessages, setMatchedUserMessages] = useState(null)

    const getUserMessages = async () => {
        try {
            const response = await axios.get("http://localhost:8000/messages", {
                params: {userId: userId, correspondingUserId: clickedUserId}
        })
        setUsersMessages(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const getMatchedMessages = async () => {
        try {
            const response = await axios.get("http://localhost:8000/messages", {
                params: {userId: clickedUserId, correspondingUserId: userId}
        })
        setMatchedUserMessages(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getUserMessages()
        getMatchedMessages()
    }, [])

    const messages = []

    usersMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = user?.first_name
        formattedMessage['img'] = user?.url
        formattedMessage['message'] = message?.message
        formattedMessage['timestamp'] = message?.timestamp
        messages.push(formattedMessage)
    });

    MatchedUserMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = clickedUser?.first_name
        formattedMessage['img'] = clickedUser?.url
        formattedMessage['message'] = message?.message
        formattedMessage['timestamp'] = message?.timestamp
        messages.push(formattedMessage)
    });

    const sortedMessages = messages.sort((a, b) => {
        return new Date(a.timestamp) - new Date(b.timestamp)
    })

    const latestMessage = sortedMessages?.[sortedMessages.length - 1]


    return (
        <>
        <Chat sortedMessages={sortedMessages} latestMessage={latestMessage}/>
        <ChatInput/>
        </>
    );
}

export default ChatDisplay;