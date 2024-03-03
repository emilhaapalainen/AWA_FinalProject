const Chat = ({ sortedMessages }) => {

    return (
        <>
            <div className="chat-display">
                {sortedMessages.map((message, _index) => (
                    <div key={_index}>
                        <div className="chat-msg-header">
                            <div className="img-container">
                                <img src={message.img} alt={message.name + ' profile'}/>
                            </div>
                            <p>{message.name} {message.timestamp}</p>
                        </div>
                        <p>{message.message}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Chat;