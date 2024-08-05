import { useEffect, useRef, useState } from "react";
import "../assets/Chat.css";
import io from "socket.io-client";
import PropTypes from "prop-types";
import Footer from "./Footer";

const MessageInterface = ({ apiUrl, contactId, userId, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!contactId) return;
    const token = localStorage.getItem("token");
    const socket = io(apiUrl);
    socketRef.current = socket;

    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/history/${userId}/${contactId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setMessages(Array.isArray(data) ? data : []);
        setError("");
        setLoading(false);
        socket.emit("message read", {
          chatId: data._id,
          userId: userId,
        });
      } catch (error) {
        setError("Failed to fetch messages");
        setLoading(false);
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

    socket.on("typing", (data) => {
      if (data.userId === contactId) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      }
    });

    socket.on("message status updated", (data) => {
      console.log("Message status updated event received:", data);
      const { chatId, messageId, status } = data;

      setMessages((prevMessages) =>
        prevMessages.map((chat) =>
          chat._id === chatId
            ? {
                ...chat,
                messages: chat.messages.map((msg) =>
                  msg._id === messageId ? { ...msg, status } : msg
                ),
              }
            : chat
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [apiUrl, contactId, userId]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
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
        const newMsg = {
          _id: result.messageId,
          senderId: userId,
          receiverId: contactId,
          message: newMessage,
          timestamp: new Date().toISOString(),
          status: "sent",
        };

        setMessages((prevMessages) => [...prevMessages, newMsg]);
        setNewMessage("");

        setError("");

        if (result.chatId && result.messageId) {
          socketRef.current.emit("message delivered", {
            chatId: result.chatId,
            messageId: result.messageId,
            receiverId: contactId,
          });
        } else {
          console.error("Missing chatId or messageId in result:", result);
        }
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("Failed to send message");
    }
  };

  const handleTyping = () => {
    if (socketRef.current) {
      socketRef.current.emit("typing", { userId, contactId });
    }
  };

  return (
    <>
      <div className={`chat-container ${darkMode ? "dark-mode" : ""}`}>
        <div className="top-buttons">
          <button onClick={onBack} className="btn btn-primary hBack">
            Go Back
          </button>
          <button onClick={toggleDarkMode} className="btn btn-primary">
            Toggle Dark Mode
          </button>
        </div>
        <div className="message-interface">
          <div className="messages-container">
            {messages.map((chat, index) => (
              <div key={index}>
                {chat.messages &&
                  chat.messages.map((msg, msgIndex) => (
                    <div
                      key={msgIndex}
                      className={`message ${
                        msg.senderId === userId ? "own" : "other"
                      }`}
                    >
                      <p className="message-text">{msg.message}</p>
                      <div className="message-info">
                        <p className="message-timestamp">
                          {new Date(msg.timestamp).toLocaleString()}
                        </p>
                        {msg.senderId === userId && (
                          <p className="message-status">
                            {msg.status === "sent" && (
                              <span className="checkmark single-checkmark" />
                            )}
                            {msg.status === "delivered" && (
                              <span className="checkmark double-checkmark" />
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
            {isTyping && <div className="typing-indicator">Typing...</div>}
            <form onSubmit={handleSendMessage} className="message-form">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleTyping}
                placeholder="Type your message..."
                required
              />
              <button type="submit">Send</button>
            </form>
          </div>
          {error && <div className="error-message">{error}</div>}
          {loading && (
            <div className="loading-message">Loading messages...</div>
          )}
          {!loading && messages.length === 0 && (
            <div className="no-messages">No messages yet. Start chatting!</div>
          )}
        </div>
      </div>
      <Footer />
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
