import { useEffect, useState } from "react";
import "../assets/Chat.css";
import io from "socket.io-client";
import PropTypes from "prop-types";

const MessageInterface = ({ apiUrl, contactId, userId, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contactId) return;

    const socket = io(apiUrl);

    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/history/${userId}/${contactId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setMessages(data);
        setError("");
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch messages");
      }
    };

    fetchMessages();

    socket.on("chat message", (message) => {
      if (
        (message.senderId === userId && message.receiverId === contactId) ||
        (message.senderId === contactId && message.receiverId === userId)
      ) {
        setMessages([message]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [apiUrl, contactId, userId]);

  const handleSendMessage = async () => {
    if (!userId) {
      setError("User not authenticated");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: userId,
          receiverId: contactId,
          message: newMessage,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            senderId: userId,
            receiverId: contactId,
            message: newMessage,
            timestamp: new Date().toISOString(),
          },
        ]);
        setNewMessage("");
        setError("");
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("Failed to send message");
    }
  };

  return (
    <>
      <button onClick={onBack} className="btn btn-primary hBack">
        Go Back
      </button>
      <div className="message-interface">
        <div className="messages-container">
          {messages.map((chat, index) => (
            <div key={index}>
              {chat.messages.map((msg, msgIndex) => (
                <div
                  key={msgIndex}
                  className={`message ${
                    msg.senderId === userId ? "own" : "other"
                  }`}
                >
                  <p className="message-text">{msg.message}</p>
                  <p className="message-timestamp">
                    {new Date(msg.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="message-form">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            required
          />
          <button type="submit">Send</button>
        </form>
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">Loading messages...</div>}
        {!loading && messages.length === 0 && (
          <div className="no-messages">No messages yet. Start chatting!</div>
        )}
      </div>
    </>
  );
};

MessageInterface.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  contactId: PropTypes.string,
  userId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default MessageInterface;
