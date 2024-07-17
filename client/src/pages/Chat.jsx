import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../assets/Chat.css";
import io from "socket.io-client";

const Chat = () => {
  const { contactId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userId = decoded.userId;

    const socket = io(import.meta.env.VITE_API_BASE_URL);

    const fetchMessages = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
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
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [contactId]);

  const handleSendMessage = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userId = decoded.userId;

    if (!userId) {
      setError("User not authenticated");
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
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
    <div className="message-interface">
      <div className="messages-container">
        {messages.map((chat, index) => (
          <div key={index}>
            {chat.messages.map((msg, msgIndex) => (
              <div
                key={msgIndex}
                className={`message ${
                  msg.senderId ===
                  jwtDecode(localStorage.getItem("token")).userId
                    ? "own"
                    : ""
                }`}
              >
                <p>{msg.message}</p>
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
  );
};

export default Chat;
